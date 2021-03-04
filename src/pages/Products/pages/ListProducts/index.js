import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';

import { FaSpinner } from 'react-icons/fa';

import { useQuery } from 'react-query';
import { Container, LoadingContainer } from './styles';

import Product from '~/components/Product';
import NullProduct from '~/components/NullProduct';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import { nameIsValid } from '~/utils/validation';

import backend from '~/services/api';

import { fixAddToCart } from '~/store/modules/cart/actions';

export default function ListProducts() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [pageHeight, setPageHeight] = useState(1184);
  const [productHeight, setProductHeight] = useState('');
  const [paginationArray, setPaginationArray] = useState([]);
  const [field, setField] = useState('latest');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const [perPage, setPerPage] = useState(() => (isDesktop ? 15 : 16));

  const dispatch = useDispatch();

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }
    setPaginationArray(items);
  }, [lastPage]);

  const loadProducts = useCallback(async () => {
    const productsResponse = await backend.get(
      `ecommerce/products?page=${currentPage}&special_order=${field}&per_page=${perPage}`
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
    const productsData = {
      products: data,
      currentPage: current_page,
      lastPage: last_page,
    };

    return productsData;
  }, [currentPage, field, isDesktop, perPage]);

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
    dispatch(fixAddToCart());
  }, [dispatch]);

  const { data, isLoading, status, isError } = useQuery(
    ['products', currentPage, field, perPage],
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
  }, [data, isLoading, generatePaginationArray, searchInput, searchProduct]);

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

  return (
    <>
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
      <Container pageHeight={pageHeight} isDesktop={isDesktop}>
        {loading || isLoading ? (
          <LoadingContainer isDesktop={isDesktop}>
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
      </Container>
      <FooterPagination isDesktop={isDesktop}>
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
    </>
  );
}
