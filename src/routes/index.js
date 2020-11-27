import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Contents from '~/pages/Contents';
import Content from '~/pages/Contents/pages/ViewContent';
import Basket from '~/pages/Basket';
import Delivery from '~/pages/Delivery';
import Confirmation from '~/pages/Confirmation';

import ControlPanel from '~/pages/Account/pages/ControlPanel';
import PeriodicDelivery from '~/pages/Account/pages/PeriodicDelivery';
import MyOrders from '~/pages/Account/pages/MyOrders';
import MyAccount from '~/pages/Account/pages/MyAccount';
import MyAddress from '~/pages/Account/pages/MyAddress';
import MyFavorites from '~/pages/Account/pages/MyFavorites';

import Products from '~/pages/Products/pages/ListProducts';
import Product from '~/pages/Products/pages/ViewProduct';
import ProductsPerCategory from '~/pages/Products/pages/ListProductsPerCategory';
import Promotions from '~/pages/Promotions';

import AccountRoute from './accountRoute';
import ProductsRoute from './productsRoute';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/conteudos" component={Contents} isPrivate />
        <Route path="/cesto" component={Basket} isPrivate />
        <Route path="/entrega" component={Delivery} isPrivate />
        <Route path="/confirmacao" component={Confirmation} isPrivate />
        <AccountRoute path="/painel" component={ControlPanel} isPrivate />
        <AccountRoute path="/entregas" component={PeriodicDelivery} isPrivate />
        <AccountRoute path="/encomendas" component={MyOrders} isPrivate />
        <AccountRoute path="/conta" component={MyAccount} isPrivate />
        <AccountRoute path="/endereco" component={MyAddress} isPrivate />
        <AccountRoute path="/favoritos" component={MyFavorites} isPrivate />
        <ProductsRoute path="/produtos" exact component={Products} />
        <ProductsRoute path="/produto" component={Product} />
        <Route path="/produtos/promocoes" component={Promotions} />
        <ProductsRoute path="/produtos" component={ProductsPerCategory} />
        <Route path="/conteudo" component={Content} />
      </Switch>
    </BrowserRouter>
  );
}
