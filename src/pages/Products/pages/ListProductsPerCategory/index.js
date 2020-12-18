import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { Container, NullProduct, LoadingContainer } from './styles';

import Product from '~/components/Product';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import { nameIsValid } from '~/utils/validation';

import backend from '~/services/api';

export default function ListProductsPerCategory() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [pageHeight, setPageHeight] = useState(1184);
  const [loading, setLoading] = useState(true);
  const [paginationArray, setPaginationArray] = useState([]);
  const [field, setField] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  const [noProductsFound, setNoProductsFound] = useState(false);

  const { state, pathname } = useLocation();

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }

    setPaginationArray(items);
  }, [lastPage]);

  const loadProductsByCategory = useCallback(async () => {
    if (!nameIsValid(searchInput)) return;

    const productsResponse = await backend.get(
      `ecommerce/products/categories/${state.id}?page=${currentPage}&special_order=${field}`
    );

    const {
      data: {
        data: { data, current_page, last_page, next_page_url, prev_page_url },
      },
    } = productsResponse;

    if (data.length % 5 !== 0) {
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
    let hasLastRow;

    if (isDesktop)
      hasLastRow = data.length > 10 ? 1184 : Math.ceil(data.length / 5) * 404;
    else
      hasLastRow = data.length > 14 ? 2804 : Math.ceil(data.length / 2) * 354;

    setPageHeight(hasLastRow);

    setProducts(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setNextPageUrl(next_page_url);

    // console.tron.log(data);
  }, [state.id, currentPage, searchInput, isDesktop, field]);

  const searchProduct = useCallback(async () => {
    try {
      if (nameIsValid(searchInput)) return;
      setLoading(true);
      const productsResponse = await backend.get(
        `ecommerce/products/search/${searchInput}?page=${currentPage}&special_order=${field}`
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

      if (data.length % 5 !== 0) {
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

      let hasLastRow;

      if (isDesktop)
        hasLastRow = data.length > 10 ? 1184 : Math.ceil(data.length / 5) * 404;
      else
        hasLastRow = data.length > 14 ? 2804 : Math.ceil(data.length / 2) * 354;

      setPageHeight(hasLastRow);

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
  }, [currentPage, field, isDesktop, searchInput]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setLoading(true);
    loadProductsByCategory();
    generatePaginationArray();

    setLoading(false);
  }, [
    loadProductsByCategory,
    generatePaginationArray,
    currentPage,
    field,
    pathname,
    state,
  ]);

  useEffect(() => setSearchInput(''), [pathname]);

  useEffect(() => {
    setNoProductsFound(false);
    const timer = setTimeout(searchProduct, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, searchProduct]);

  return (
    <>
      <CustomHeader
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        paginationArray={paginationArray}
        setField={setField}
        inputValue={searchInput}
        setInputValue={setSearchInput}
      />

      {loading ? (
        <LoadingContainer>
          <FaSpinner color="#666" size={42} />
          <strong>Carregando os produtos, aguarde...</strong>
        </LoadingContainer>
      ) : noProductsFound ? (
        <LoadingContainer>
          <strong>
            Não encontramos nenhum produto com o nome informado. <br /> Tente
            novamente.
          </strong>
        </LoadingContainer>
      ) : (
        <Container pageHeight={pageHeight} isDesktop={isDesktop}>
          {products.map((p, index) =>
            p === null ? (
              <NullProduct />
            ) : (
              <Product key={p.id} index={index} product={p} />
            )
          )}
        </Container>
      )}
      <FooterPagination isDesktop={isDesktop}>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          paginationArray={paginationArray}
          isDesktop={isDesktop}
        />
      </FooterPagination>
    </>
  );
}
