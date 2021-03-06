import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaSpinner } from 'react-icons/fa';
import detectBrowserLanguage from 'detect-browser-language';

import { useQuery } from 'react-query';
import {
  ProductsContainer,
  Container,
  Content,
  LoadingContainer,
} from './styles';

import Product from '~/pt/components/Product';
import NullProduct from '~/pt/components/NullProduct';
import CustomHeader from '~/pt/components/CustomHeader';
import Pagination from '~/pt/components/Pagination';
import FooterPagination from '~/pt/components/FooterPagination';
import Header from '~/pt/components/Header';

import LoginModal from '~/pt/pages/LoginModal';

import { nameIsValid } from '~/utils/validation';

import backend from '~/services/api';

export default function Promotions() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [pageHeight, setPageHeight] = useState(1184);
  const [productHeight, setProductHeight] = useState('');
  const [paginationArray, setPaginationArray] = useState([]);
  const [field, setField] = useState('latest');
  const [searchInput, setSearchInput] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [perPage, setPerPage] = useState(() => (isDesktop ? 15 : 16));

  const isEnglish = useMemo(() => {
    console.log(detectBrowserLanguage());
    const browserLanguage = detectBrowserLanguage();
    const isEng = browserLanguage.split('-')[0] === 'en';
    console.log('isBre-esh');
    console.log(isEng);
    // if (isEnglish) return <Redirect to="/uk" />;
    return isEng;
  }, []);

  const firstLogin = useSelector(state => state.auth.firstLogin);
  const noFavorite = useSelector(state => state.auth.noFavorite);

  const history = useHistory();

  useEffect(() => {
    if (firstLogin) history.push('/painel');
  }, [history, firstLogin]);

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }
    setPaginationArray(items);
  }, [lastPage]);

  const loadProducts = useCallback(async () => {
    const productsResponse = await backend.get(
      `ecommerce/products?page=${currentPage}&special_order=${field}&only_promotional=true&per_page=${perPage}`
    );

    const {
      data: {
        data: { data, current_page, last_page },
      },
    } = productsResponse;

    if (isDesktop && data.length % 5 !== 0) {
      const itemsToFill = Math.ceil(data.length / 5) * 5 - data.length;

      for (let i = 0; i < itemsToFill; i++) {
        data.push(null);
      }
    }

    if (!isDesktop && data.length % 2 !== 0) {
      const itemsToFill = Math.ceil(data.length / 2) * 2 - data.length;

      for (let i = 0; i < itemsToFill; i++) {
        data.push(null);
      }
    }

    setLastPage(last_page);

    // console.log(products.length);

    const promotionsData = {
      products: data,
      currentPage: current_page,
      lastPage: last_page,
    };

    return promotionsData;
  }, [currentPage, field, perPage, isDesktop]);

  // falta ajustar a busca de produtos - v
  // alternar a busca e os conteúdos do cache - v
  // testar o filtro (mais visitados, etc) - o
  // testar a altura da página

  // ajustar a paginação

  const searchProduct = useCallback(async () => {
    try {
      if (nameIsValid(searchInput)) return;

      setLoading(true);
      const productsResponse = await backend.get(
        `ecommerce/products/search/${searchInput}?page=${currentPage}&special_order=${field}&per_page=${perPage}`
      );

      const {
        data: {
          meta: { message },
        },
      } = productsResponse;

      if (message === 'Nenhum registro encontrado') {
        setLoading(false);
        setNoProductsFound(true);
        return;
      }

      const {
        data: {
          data: { data, current_page, last_page },
        },
      } = productsResponse;

      if (isDesktop && data.length % 5 !== 0) {
        const itemsToFill = Math.ceil(data.length / 5) * 5 - data.length;

        for (let i = 0; i < itemsToFill; i++) {
          data.push(null);
        }
      }

      if (!isDesktop && data.length % 2 !== 0) {
        const itemsToFill = Math.ceil(data.length / 2) * 2 - data.length;

        for (let i = 0; i < itemsToFill; i++) {
          data.push(null);
        }
      }

      setProducts(data);
      setCurrentPage(current_page);
      setLastPage(last_page);

      setLoading(false);
    } catch {
      setLoading(false);
      alert('Erro');
    }
  }, [currentPage, field, searchInput, isDesktop, perPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError, status } = useQuery(
    ['promotions', currentPage, field, perPage],
    loadProducts,
    {
      staleTime: 1000 * 60 * 30, // 30 mins
    }
  );

  useEffect(() => {
    if (isLoading) return;

    if (nameIsValid(searchInput)) {
      setProducts(data.products);
      setLastPage(data.lastPage);

      return;
    }

    setNoProductsFound(false);
    const timer = setTimeout(searchProduct, 1000);

    return () => clearTimeout(timer);
  }, [data, searchInput, isLoading, generatePaginationArray, searchProduct]);

  useEffect(() => {
    if (products.length === 0) return;

    const height = Number(productHeight) < 290 ? 368 : productHeight;

    let hasLastRow;

    if (isDesktop)
      hasLastRow =
        products.length > 10 ? 1184 : Math.ceil(products.length / 5) * 404;
    else hasLastRow = Math.ceil(products.length / 2) * (height + 25);

    setPageHeight(hasLastRow);
  }, [isDesktop, products, productHeight]);

  useEffect(() => {
    generatePaginationArray();
  }, [generatePaginationArray, lastPage]);

  const ptEnabled = useSelector(s => s.user.ptEnabled);

  return !ptEnabled ? (
    <Redirect to="/products/promotions" />
  ) : (
    <>
      <Header login={() => setLoginModal(true)} active="Promoções" />

      <Container>
        <Content isDesktop={isDesktop}>
          {!isLoading && (
            <CustomHeader
              currentPage={currentPage}
              lastPage={lastPage}
              setCurrentPage={setCurrentPage}
              paginationArray={paginationArray}
              setField={setField}
              inputValue={searchInput}
              setInputValue={setSearchInput}
            />
          )}

          <ProductsContainer pageHeight={pageHeight} isDesktop={isDesktop}>
            {loading || isLoading ? (
              <LoadingContainer isDesktop={isDesktop}>
                <FaSpinner color="#666" size={42} />
                <strong>Carregando os produtos, aguarde...</strong>
              </LoadingContainer>
            ) : noProductsFound ? (
              <LoadingContainer>
                <strong>
                  Não encontramos nenhum produto com o nome informado. <br />{' '}
                  Tente novamente.
                </strong>
              </LoadingContainer>
            ) : (
              !isError &&
              status === 'success' &&
              products.map((p, index) =>
                p === null ? (
                  <NullProduct />
                ) : (
                  <Product
                    key={p.id}
                    index={index}
                    product={p}
                    setHeight={setProductHeight}
                  />
                )
              )
            )}
          </ProductsContainer>
        </Content>
        <FooterPagination
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
          isDesktop={isDesktop}
        >
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              setCurrentPage={setCurrentPage}
              paginationArray={paginationArray}
              isDesktop={isDesktop}
            />
          )}
        </FooterPagination>
      </Container>
      {(loginModal || noFavorite) && (
        <LoginModal closeModal={() => setLoginModal(false)} />
      )}
    </>
  );
}
