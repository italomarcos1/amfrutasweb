import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaSpinner } from 'react-icons/fa';

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
  const [lastPage, setLastPage] = useState(0);
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [pageHeight, setPageHeight] = useState(1184);
  const [productHeight, setProductHeight] = useState('');
  const [paginationArray, setPaginationArray] = useState([]);
  const [field, setField] = useState('latest');
  const [searchInput, setSearchInput] = useState('');
  const [loginModal, setLoginModal] = useState(false);
  const noFavorite = useSelector(state => state.auth.noFavorite);
  const firstLogin = useSelector(state => state.auth.firstLogin);
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const [perPage, setPerPage] = useState(() => (isDesktop ? 15 : 16));

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
    if (!nameIsValid(searchInput)) return;

    const productsResponse = await backend.get(
      `ecommerce/products?page=${currentPage}&special_order=${field}&only_promotional=true&per_page=${perPage}`
    );

    const {
      data: {
        data: { data, current_page, last_page, next_page_url, prev_page_url },
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
    setNextPageUrl(next_page_url);
    setPrevPageUrl(prev_page_url);
  }, [currentPage, field, perPage, isDesktop, searchInput]);

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
          data: { data, current_page, last_page, next_page_url, prev_page_url },
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
      setNextPageUrl(next_page_url);
      setPrevPageUrl(prev_page_url);
      setLoading(false);
    } catch {
      setLoading(false);
      alert('Erro');
    }
  }, [currentPage, field, searchInput, isDesktop, perPage]);

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

    loadProducts();
    generatePaginationArray();
  }, [loadProducts, generatePaginationArray, currentPage, field]);

  useEffect(() => {
    setNoProductsFound(false);
    const timer = setTimeout(searchProduct, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, searchProduct]);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Promoções" />

      <Container>
        <Content isDesktop={isDesktop}>
          <CustomHeader
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            paginationArray={paginationArray}
            setField={setField}
            inputValue={searchInput}
            setInputValue={setSearchInput}
          />
          <ProductsContainer pageHeight={pageHeight} isDesktop={isDesktop}>
            {loading ? (
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
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            paginationArray={paginationArray}
            isDesktop={isDesktop}
          />
        </FooterPagination>
      </Container>
      {(loginModal || noFavorite) && (
        <LoginModal closeModal={() => setLoginModal(false)} />
      )}
    </>
  );
}
