import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useScrollYPosition } from 'react-use-scroll-position';
import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';

import {
  Header,
  HeaderContent,
  Menu,
  MenuContent,
  MenuItem,
  MenuItemButton,
  Price,
  Badge,
  BadgeContainer,
  SubTitle,
  GoToCartContainer,
  Background,
  MenuMobile,
  Title,
  Separator,
  MenuItemLink,
} from './styles';

import Logo from '~/assets/amfrutas-top.svg';

import close from '~/assets/close-white.svg';

import backend from '~/services/api';

import Category from '~/components/MenuItemMobile';

export default function MainMenu({ route }) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const history = useHistory();
  const { pathname } = useLocation();

  const scrollY = useScrollYPosition();

  const [selectedCategory, setSelectedCategory] = useState('none');
  const [childrenSelectedCategory, setChildrenSelectedCategory] = useState(
    'none'
  );
  const [subChildrenSelected, setSubChildrenSelected] = useState('none');
  const [categories, setCategories] = useState([]);

  const [headerFixed, setHeaderFixed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [categoryActive, setCategoryActive] = useState('none');

  const [menuItems, setMenuItems] = useState([
    'Promoções',
    'Lojas',
    'Condições de Venda',
    'Minha Conta',
    'Carrinho de Compras',
  ]);

  const [footerData, setFooterData] = useState([]);
  const [social, setSocial] = useState([]);

  useEffect(() => {
    if (scrollY >= 71) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  }, [scrollY]);

  const keys = ['facebook', 'instagram', 'twitter', 'youtube', 'social_nif'];

  const loadData = useCallback(async () => {
    setLoading(true);
    const [
      categoriesResponse,
      linksResponse,
      socialMedia,
      linksFooter,
    ] = await Promise.all([
      backend.get(
        '/ecommerce/categories?recursively=1&per_page=100&order_field=slug&order_direction=asc'
      ),
      backend.get('/menus/links/3'),
      backend.get('configurations', { keys }),
      backend.get('/menus/links/2'),
    ]);

    const {
      data: {
        data: { data: categoriesData },
      },
    } = categoriesResponse;

    setCategories(categoriesData);

    const {
      data: { data: linksData },
    } = linksResponse;

    linksData.splice(0, 1);
    setMenuItems(linksData);

    const {
      data: { data: linkFooterData },
    } = linksFooter;

    const {
      data: { data: socialData },
    } = socialMedia;

    const { facebook, instagram, youtube, social_nif } = socialData;

    setFooterData(linkFooterData);
    setSocial({ facebook, instagram, youtube, social_nif });
    setLoading(false);
  }, []);

  useEffect(loadData, [loadData]);

  useEffect(() => {
    if (pathname === '/produtos') setSelectedCategory('none');
  }, [pathname]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Header>
        <HeaderContent isDesktop={isDesktop}>
          <Link to="/" style={{ marginLeft: 20, marginRight: 20 }}>
            <img src={Logo} alt="Logo" />
          </Link>
        </HeaderContent>
      </Header>
      <Menu style={headerFixed ? { position: 'fixed', top: 0 } : {}}>
        <MenuContent isDesktop={isDesktop}>
          <MenuItemButton onClick={() => history.push(route)}>
            <img src={close} alt="Close" style={{ width: 30, height: 30 }} />
          </MenuItemButton>
        </MenuContent>
      </Menu>
      <Background>
        <Title>Principal</Title>
        <ul>
          {!loading &&
            menuItems.map(({ id, name, url }) => (
              <MenuItem
                key={id}
                to={{
                  pathname: `${url}`,
                  state: {
                    id: url,
                  },
                }}
              >
                {name}
              </MenuItem>
            ))}
        </ul>
        <Separator />
        <Title>Produtos</Title>
        <ul>
          {!loading &&
            categories.map(category => (
              <Category
                key={category.id}
                category={category}
                childrenSelected={childrenSelectedCategory}
                categoryActive={categoryActive}
                setCategoryActive={setCategoryActive}
              />
            ))}
        </ul>
        <Separator />
        <Title>Atendimento e Social</Title>
        <ul>
          {!loading &&
            footerData.map(({ id, url, name }) => (
              <MenuItem
                key={id}
                to={{
                  pathname: `${url}`,
                  state: {
                    id: url,
                  },
                }}
              >
                {name}
              </MenuItem>
            ))}
          {!loading && (
            <>
              <MenuItemLink
                href={
                  !!social ? `https://www.facebook.com/${social.facebook}` : ''
                }
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </MenuItemLink>
              <MenuItemLink
                href={
                  !!social ? `https://instagram.com/${social.instagram}` : ''
                }
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </MenuItemLink>
              <MenuItemLink
                href={
                  !!social
                    ? `https://youtube.com/channel/${social.youtube}`
                    : ''
                }
                target="_blank"
                rel="noreferrer"
                style={{ borderBottom: 'none' }}
              >
                YouTube
              </MenuItemLink>
              <MenuItemLink href="#" rel="noreferrer">
                &nbsp;
              </MenuItemLink>
            </>
          )}
        </ul>
      </Background>
    </div>
  );
}

MainMenu.propTypes = {
  route: PropTypes.string,
};

MainMenu.defaultProps = {
  route: '/',
};
