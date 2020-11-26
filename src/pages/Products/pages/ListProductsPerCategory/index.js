import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, NullProduct } from './styles';

import Product from '~/components/Product';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import backend from '~/services/api';

export default function ListProductsPerCategory() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [pageHeight, setPageHeight] = useState(1184);
  const [loading, setLoading] = useState(true);
  const [paginationArray, setPaginationArray] = useState([]);
  const [orderDirection, setOrderDirection] = useState('desc');
  const [orderField, setOrderField] = useState('updated_at');

  const { state } = useLocation();

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }

    setPaginationArray(items);
  }, [lastPage]);

  const loadProductsByCategory = useCallback(async () => {
    console.tron.log('ah');
    const productsResponse = await backend.get(
      `ecommerce/products/categories/${state.id}?page=${currentPage}&order_field=${orderField}&order_direction=${orderDirection}`
    );

    const {
      data: {
        data: {
          data,
          per_page,
          current_page,
          last_page,
          next_page_url,
          prev_page_url,
        },
      },
    } = productsResponse;

    console.tron.log(data);

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

    // console.tron.log(data);
  }, [state.id, currentPage, orderDirection, orderField]);

  useEffect(() => {
    setLoading(true);
    loadProductsByCategory();
    generatePaginationArray();

    setLoading(false);
  }, [
    loadProductsByCategory,
    generatePaginationArray,
    currentPage,
    orderDirection,
    orderField,
  ]);
  return (
    <>
      <CustomHeader
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        paginationArray={paginationArray}
        setOrderDirection={setOrderDirection}
        setOrderField={setOrderField}
      />

      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <Container pageHeight={pageHeight}>
          {products.map((p, index) =>
            p === null ? (
              <NullProduct />
            ) : (
              <Product key={p.id} index={index} product={p} />
            )
          )}
        </Container>
      )}
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
