import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import {
  Container,
  Menu,
  Layout,
  Content,
  MenuHeader,
  SectionTitle,
  ProductsContainer,
  PromotionsContainer,
} from './styles';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import MenuItem from '~/components/MenuItem';
import Product from '~/components/Product';

import LoginModal from '~/pages/LoginModal';

import { backend } from '~/services/api';

export default function Products({ children }) {
  const [loginModal, setLoginModal] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('none');
  const [childrenSelectedCategory, setChildrenSelectedCategory] = useState(
    'none'
  );
  const [subChildrenSelected, setSubChildrenSelected] = useState('none');
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const loadCategories = useCallback(async () => {
    const [categoriesResponse, promotionsResponse] = await Promise.all([
      backend.get(
        '/ecommerce/categories?recursively=1&order_field=slug&order_direction=asc'
      ),
      backend.get(
        '/ecommerce/products?page=1&only_promotional=true&per_page=6'
      ),
    ]);

    const {
      data: {
        data: { data },
      },
    } = categoriesResponse;

    const {
      data: {
        data: { data: promotionsResponseData },
      },
    } = promotionsResponse;

    setCategories(data);
    setPromotions(promotionsResponseData);
  }, []);
  const { pathname } = useLocation();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (pathname === '/produtos') setSelectedCategory('none');
    const routeChanged = pathname.split('/');
    setCurrentRoute(routeChanged[1]);
  }, [pathname]);

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
          <Content>{children}</Content>
        </Layout>
      </Container>

      {currentRoute === 'produto' && (
        <PromotionsContainer>
          <SectionTitle>
            <strong>Promoções da Semana</strong>
            <small>Todas as semanas com promoções especiais</small>
          </SectionTitle>
          <ProductsContainer>
            {promotions.map((p, index) => (
              <Product key={p.id} index={index} product={p} />
            ))}
          </ProductsContainer>
        </PromotionsContainer>
      )}

      <Footer />

      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}

Products.propTypes = {
  children: PropTypes.element.isRequired,
};
