import React, { useCallback, useEffect, useState } from 'react';

import { FaSpinner } from 'react-icons/fa';

import { Container, NullProduct, LoadingContainer } from './styles';

import Product from '~/components/Product';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import backend from '~/services/api';

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [pageHeight, setPageHeight] = useState(1184);
  const [paginationArray, setPaginationArray] = useState([]);
  const [field, setField] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

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
      `ecommerce/products?page=${currentPage}&special_order=${field}`
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

    setProducts(data);
    setCurrentPage(current_page);
    setLastPage(last_page);
    setNextPageUrl(next_page_url);
  }, [currentPage, field, searchInput]);

  const searchProduct = useCallback(async () => {
    try {
      if (searchInput === '') return;
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

      const hasLastRow =
        data.length > 10 ? 1184 : Math.ceil(data.length / 5) * 404;

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
  }, [currentPage, field, searchInput]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    loadProducts(currentPage);
    generatePaginationArray();
    setLoading(false);
  }, [loadProducts, generatePaginationArray, currentPage, field]);

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
        setField={setField}
        inputValue={searchInput}
        setInputValue={setSearchInput}
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
