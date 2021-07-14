import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

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

import Header from '~/pt/components/Header';
import Footer from '~/pt/components/Footer';
import MenuItem from '~/pt/components/MenuItem';
import Product from '~/pt/components/Product';

import LoginModal from '~/pt/pages/LoginModal';

import backend from '~/services/api';

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

  const noFavorite = useSelector(state => state.auth.noFavorite);
  const firstLogin = useSelector(state => state.auth.firstLogin);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const history = useHistory();

  useEffect(() => {
    if (firstLogin) history.push('/painel');
  }, [history, firstLogin]);

  const loadCategories = useCallback(async () => {
    const [categoriesResponse, promotionsResponse] = await Promise.all([
      backend.get(
        '/ecommerce/categories?recursively=1&per_page=100&order_field=slug&order_direction=asc'
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
  }, [loadCategories]);

  useEffect(() => {
    if (pathname === '/produtos') setSelectedCategory('none');
    const routeChanged = pathname.split('/');
    setCurrentRoute(routeChanged[1]);
  }, [pathname]);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Produtos" />
      <Container isDesktop={isDesktop}>
        <Layout isDesktop={isDesktop}>
          {isDesktop && (
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
          )}
          <Content isDesktop={isDesktop}>{children}</Content>
        </Layout>
      </Container>

      {isDesktop && currentRoute === 'produto' && (
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

      {(loginModal || noFavorite) && (
        <LoginModal closeModal={() => setLoginModal(false)} />
      )}
    </>
  );
}

Products.propTypes = {
  children: PropTypes.element.isRequired,
};
