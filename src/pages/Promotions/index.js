import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaSpinner } from 'react-icons/fa';

import { useQueries, useQuery } from 'react-query';
import {
  ProductsContainer,
  NullProduct,
  Container,
  Content,
  LoadingContainer,
} from './styles';

import Product from '~/components/Product';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';
import Header from '~/components/Header';

import LoginModal from '~/pages/LoginModal';

import { nameIsValid } from '~/utils/validation';

import backend from '~/services/api';

export default function Promotions() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageHeight, setPageHeight] = useState(1184);
  const [productHeight, setProductHeight] = useState('');
  const [paginationArray, setPaginationArray] = useState([]);
  const [field, setField] = useState('latest');
  const [searchInput, setSearchInput] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const [perPage, setPerPage] = useState(() => (isDesktop ? 15 : 16));

  const firstLogin = useSelector(state => state.auth.firstLogin);
  const noFavorite = useSelector(state => state.auth.noFavorite);

  const history = useHistory();

  useEffect(() => {
    if (firstLogin) history.push('/painel');
  }, [history, firstLogin]);

  const generatePaginationArray = useCallback(lastPage => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }
    setPaginationArray(items);
  }, []);

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

    generatePaginationArray(last_page);

    const promotionsData = {
      products: data,
      currentPage: current_page,
      lastPage: last_page,
    };

    return promotionsData;
  }, [currentPage, field, perPage, isDesktop, generatePaginationArray]);

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

      generatePaginationArray(last_page);

      setLoading(false);
    } catch {
      setLoading(false);
      alert('Erro');
    }
  }, [
    currentPage,
    generatePaginationArray,
    field,
    searchInput,
    isDesktop,
    perPage,
  ]);

  useEffect(() => {
    if (products.length === 0) return;
    let hasLastRow;

    if (isDesktop)
      hasLastRow =
        products.length > 10 ? 1184 : Math.ceil(products.length / 5) * 404;
    else hasLastRow = Math.ceil(products.length / 2) * (productHeight + 25);
    // console.log(products.length);
    setPageHeight(hasLastRow);
  }, [isDesktop, products, productHeight]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, status, isError } = useQuery(
    ['promotions', currentPage, field, perPage],
    loadProducts,
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60,
    }
  );

  useEffect(() => {
    if (isLoading || isError || paginationArray.length !== 0) return;

    generatePaginationArray(data.lastPage);
    console.log(paginationArray);
  }, [isLoading, paginationArray, isError, generatePaginationArray, data]);

  useEffect(() => {
    setNoProductsFound(false);

    // executar a query
    // if (!nameIsValid(searchInput)) return;

    const timer = setTimeout(searchProduct, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, searchProduct]);

  useEffect(() => {
    console.log(isError);
    console.log(status);
  }, [status, isError]);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Promoções" />

      <Container>
        <Content isDesktop={isDesktop}>
          {!isLoading && (
            <CustomHeader
              currentPage={currentPage}
              lastPage={data.lastPage}
              setCurrentPage={setCurrentPage}
              paginationArray={paginationArray}
              setField={setField}
              inputValue={searchInput}
              setInputValue={setSearchInput}
            />
          )}

          <ProductsContainer pageHeight={pageHeight} isDesktop={isDesktop}>
            {isLoading ? (
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
              data.products.map((p, index) =>
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
              lastPage={data.lastPage}
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
