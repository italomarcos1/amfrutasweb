import React, { useCallback, useEffect, useState } from 'react';

import { ProductsContainer, NullProduct, Container, Content } from './styles';

import Product from '~/components/Product';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';
import Header from '~/components/Header';

import LoginModal from '~/pages/LoginModal';

import backend from '~/services/api';

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
  const [loginModal, setLoginModal] = useState(false);

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }

    setPaginationArray(items);
  }, [lastPage]);

  const loadProducts = useCallback(async () => {
    const productsResponse = await backend.get(
      `ecommerce/products?page=${currentPage}&order_field=${orderField}&order_direction=${orderDirection}&only_promotional=true`
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
    setPrevPageUrl(prev_page_url);
  }, [currentPage, orderDirection, orderField]);

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

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Promoções" />

      <Container>
        <Content>
          <CustomHeader
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            paginationArray={paginationArray}
            setOrderDirection={setOrderDirection}
            setOrderField={setOrderField}
            orderField={orderField}
          />
          <ProductsContainer pageHeight={pageHeight}>
            {products.map((p, index) =>
              p === null ? (
                <NullProduct />
              ) : (
                <Product key={p.id} index={index} product={p} />
              )
            )}
          </ProductsContainer>
        </Content>
        <FooterPagination
          style={{ width: 995, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            paginationArray={paginationArray}
          />
        </FooterPagination>
      </Container>
      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
