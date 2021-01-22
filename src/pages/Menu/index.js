import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useScrollYPosition } from 'react-use-scroll-position';
import { useMediaQuery } from 'react-responsive';

import { useQuery } from 'react-query';
import {
  Header,
  HeaderContent,
  Menu,
  MenuContent,
  MenuItem,
  MenuItemButton,
  Background,
  Title,
  Separator,
  MenuItemLink,
  ContactButton,
} from './styles';

import Logo from '~/assets/amfrutas-top.svg';

import close from '~/assets/close-white.svg';
import smartphone from '~/assets/smartphone.svg';
import whatsapp from '~/assets/whatsapp_black.svg';

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

  const [categoryActive, setCategoryActive] = useState('none');

  useEffect(() => {
    if (scrollY >= 71) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  }, [scrollY]);

  const keys = [
    'facebook',
    'instagram',
    'twitter',
    'youtube',
    'social_nif',
    'phone_two',
  ];

  const loadData = useCallback(async () => {
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
      backend.get(`configurations?keys=${keys.join()}`),
      backend.get('/menus/links/2'),
    ]);

    const {
      data: {
        data: { data: categoriesData },
      },
    } = categoriesResponse;

    const {
      data: { data: linksData },
    } = linksResponse;

    linksData.splice(0, 1);

    const {
      data: { data: linkFooterData },
    } = linksFooter;

    const {
      data: { data: socialData },
    } = socialMedia;

    const menuMobileData = {
      categories: categoriesData,
      menuItems: linksData,
      footerData: linkFooterData,
      social: { ...socialData, whatsapp: socialData.whatsapp },
    };

    return menuMobileData;
  }, []);

  const { data, isLoading } = useQuery('menuMobile', loadData);

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
          {!isLoading && (
            <>
              <MenuItemButton onClick={() => history.push(route)}>
                <img
                  src={close}
                  alt="Close"
                  style={{ width: 30, height: 30 }}
                />
              </MenuItemButton>
              <ContactButton
                href={`tel:351${data.social.phone_two}`}
                rel="noreferrer"
              >
                <img
                  src={smartphone}
                  alt="Phone"
                  style={{ width: 10, height: 16 }}
                />
                {data.social.phone_two}
              </ContactButton>
              <ContactButton
                href={`https://api.whatsapp.com/send?phone=351${data.social.whatsapp}`}
                rel="noreferrer"
              >
                <img
                  src={whatsapp}
                  alt="WhatsApp"
                  style={{ width: 13, height: 13 }}
                />
                WhatsApp
              </ContactButton>
            </>
          )}
        </MenuContent>
      </Menu>
      <Background>
        <Title>Principal</Title>
        <ul>
          {!isLoading &&
            data.menuItems.map(({ id, name, url }) => (
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
          {!isLoading &&
            data.categories.map(category => (
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
          {!isLoading &&
            data.footerData.map(({ id, url, name }) => (
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
          {!isLoading && (
            <>
              <MenuItemLink
                href={
                  !!data.social
                    ? `https://www.facebook.com/${data.social.facebook}`
                    : ''
                }
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </MenuItemLink>
              <MenuItemLink
                href={
                  !!data.social
                    ? `https://instagram.com/${data.social.instagram}`
                    : ''
                }
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </MenuItemLink>
              <MenuItemLink
                href={
                  !!data.social
                    ? `https://youtube.com/channel/${data.social.youtube}`
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
