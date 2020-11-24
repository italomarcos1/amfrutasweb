import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  ProductsContainer,
  NullProduct,
  Menu,
  Layout,
  Content,
  FooterPagination,
  MenuHeader,
} from './styles';

import arrow from '~/assets/icons/arrow_white.svg';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Product from '~/components/Product';
import SearchInput from '~/components/SearchInput';
import Pagination from '~/components/Pagination';
import MenuItem from '~/components/MenuItem';
import CustomHeader from '~/components/CustomHeader';

import LoginModal from '~/pages/LoginModal';

import { backend } from '~/services/api';

export default function Products() {
  const [loginModal, setLoginModal] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [pageHeight, setPageHeight] = useState(1184);

  const [selectedCategory, setSelectedCategory] = useState('none');
  const [childrenSelectedCategory, setChildrenSelectedCategory] = useState(
    'none'
  );
  const [subChildrenSelected, setSubChildrenSelected] = useState('none');

  const loadProducts = useCallback(async () => {
    const [productsResponse, categoriesResponse] = await Promise.all([
      backend.get('ecommerce/products'),
      backend.get(
        '/ecommerce/categories?recursively=1&order_field=slug&order_direction=asc'
      ),
    ]);

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

    const {
      data: {
        data: { data: categoriesResponseData },
      },
    } = categoriesResponse;

    setCategories(categoriesResponseData);

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
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Produtos" />
      <Container>
        <Layout>
          <Menu>
            <MenuHeader>
              <strong>Categorias</strong>
              <small>Garantia de produtos frescos</small>
            </MenuHeader>
            {categories.map(category => (
              <MenuItem
                key={category.id}
                category={category}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                childrenSelected={childrenSelectedCategory}
                setChildrenSelected={setChildrenSelectedCategory}
                subSelected={subChildrenSelected}
                setSubChildrenSelected={setSubChildrenSelected}
              />
            ))}
          </Menu>
          <Content>
            <CustomHeader
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
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
            <FooterPagination>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </FooterPagination>
          </Content>
        </Layout>
      </Container>
      <Footer />

      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
