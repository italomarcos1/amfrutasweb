import React, { useCallback, useEffect, useState } from 'react';

import { Container, NullProduct } from './styles';

import Product from '~/components/Product';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import { backend } from '~/services/api';

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [pageHeight, setPageHeight] = useState(1184);

  const loadProducts = useCallback(async () => {
    const productsResponse = await backend.get('ecommerce/products');

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

    console.tron.log(data);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <CustomHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Container pageHeight={pageHeight}>
        {products.map((p, index) =>
          p === null ? (
            <NullProduct />
          ) : (
            <Product key={p.id} index={index} product={p} />
          )
        )}
      </Container>
      <FooterPagination>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </FooterPagination>
    </>
  );
}
