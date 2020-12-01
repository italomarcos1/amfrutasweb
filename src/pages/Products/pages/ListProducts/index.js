import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FaSpinner } from 'react-icons/fa';

import { Container, NullProduct, LoadingContainer } from './styles';

import Product from '~/components/Product';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import backend from '~/services/api';

import { updatePages } from '~/store/modules/cart/actions';

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [pageHeight, setPageHeight] = useState(1184);
  const [paginationArray, setPaginationArray] = useState([]);
  const [orderDirection, setOrderDirection] = useState('desc');
  const [orderField, setOrderField] = useState('updated_at');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const dispatch = useDispatch();

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }

    setPaginationArray(items);
  }, [lastPage]);

  const loadProducts = useCallback(async () => {
    if (searchInput !== '') return;
    const productsResponse = await backend.get(
      `ecommerce/products?page=${currentPage}&order_field=${orderField}&order_direction=${orderDirection}`
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

    const hasLastRow =
      data.length > 10 ? 1184 : Math.ceil(data.length / 5) * 404;

    setPageHeight(hasLastRow);
    dispatch(updatePages(last_page));

    setProducts(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setNextPageUrl(next_page_url);
    setPrevPageUrl(prev_page_url);
  }, [currentPage, dispatch, orderDirection, orderField, searchInput]);

  const searchProduct = useCallback(async () => {
    try {
      if (searchInput === '') return;
      setLoading(true);
      const productsResponse = await backend.get(
        `ecommerce/products/search/${searchInput}?page=${currentPage}&order_field=${orderField}&order_direction=${orderDirection}`
      );

      const {
        data: {
          meta: { message },
        },
      } = productsResponse;

      if (message === 'Nenhum registro encontrado') {
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

      const hasLastRow =
        data.length > 10 ? 1184 : Math.ceil(data.length / 5) * 404;

      dispatch(updatePages(last_page));
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
  }, [currentPage, orderField, orderDirection, dispatch, searchInput]);

  useEffect(() => {
    loadProducts(currentPage);
    generatePaginationArray();
  }, [
    loadProducts,
    generatePaginationArray,
    currentPage,
    orderDirection,
    orderField,
  ]);

  useEffect(() => {
    setNoProductsFound(false);
    searchProduct();
  }, [searchInput, searchProduct]);

  return (
    <>
      <CustomHeader
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        paginationArray={paginationArray}
        setOrderDirection={setOrderDirection}
        setOrderField={setOrderField}
        orderField={orderField}
        inputValue={searchInput}
        setInputValue={setSearchInput}
        search={searchProduct}
      />
      <Container pageHeight={pageHeight}>
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
          products.map((p, index) =>
            p === null ? (
              <NullProduct />
            ) : (
              <Product key={p.id} index={index} product={p} />
            )
          )
        )}
      </Container>
      <FooterPagination>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          paginationArray={paginationArray}
        />
      </FooterPagination>
    </>
  );
}
