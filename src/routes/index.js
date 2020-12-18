import React from 'react';
import { Switch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Home from '~/pages/Home';
import Contents from '~/pages/Contents';
import Content from '~/pages/Contents/pages/ViewContent';
import Basket from '~/pages/Basket';
import Delivery from '~/pages/Delivery';
import Confirmation from '~/pages/Confirmation';

import IsMobile from '~/pages/IsMobile';
import Menu from '~/pages/Menu';

import ControlPanel from '~/pages/Account/pages/ControlPanel';
import PeriodicDelivery from '~/pages/Account/pages/PeriodicDelivery';
import MyOrders from '~/pages/Account/pages/MyOrders';
import MyAccount from '~/pages/Account/pages/MyAccount';
import MyAddress from '~/pages/Account/pages/MyAddress';
import MyFavorites from '~/pages/Account/pages/MyFavorites';

import Products from '~/pages/Products/pages/ListProducts';
import Product from '~/pages/Products/pages/ViewProduct';
import ProductMobile from '~/pages/Products/pages/ViewProductMobile';
import ProductsPerCategory from '~/pages/Products/pages/ListProductsPerCategory';
import Promotions from '~/pages/Promotions';

import Route from './route';
import AccountRoute from './accountRoute';
import ProductsRoute from './productsRoute';

export default function Routes() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/updating" exact component={IsMobile} />
        <Route path="/menu" component={Menu} />
        <Route path="/conteudos" component={Contents} />
        <Route path="/cesto" component={Basket} />
        <Route path="/entrega" component={Delivery} isPrivate />
        <Route path="/confirmacao" component={Confirmation} isPrivate />
        <AccountRoute path="/painel" component={ControlPanel} isPrivate />
        <AccountRoute path="/entregas" component={PeriodicDelivery} isPrivate />
        <AccountRoute path="/encomendas" component={MyOrders} isPrivate />
        <AccountRoute path="/conta" component={MyAccount} isPrivate />
        <AccountRoute path="/endereco" component={MyAddress} isPrivate />
        <AccountRoute path="/favoritos" component={MyFavorites} isPrivate />
        <ProductsRoute path="/produtos" exact component={Products} />
        <ProductsRoute
          path="/produto"
          component={isDesktop ? Product : ProductMobile}
        />
        <Route path="/produtos/promocoes" component={Promotions} />
        <ProductsRoute path="/produtos" component={ProductsPerCategory} />
        <Route path="/conteudo" component={Content} />
      </Switch>
    </>
  );
}
