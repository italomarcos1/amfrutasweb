import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Basket from '~/pages/Basket';
import Delivery from '~/pages/Delivery';
import Confirmation from '~/pages/Confirmation';

import ControlPanel from '~/pages/Account/pages/ControlPanel';
import PeriodicDelivery from '~/pages/Account/pages/PeriodicDelivery';
import MyOrders from '~/pages/Account/pages/MyOrders';
import MyAccount from '~/pages/Account/pages/MyAccount';
import MyAddress from '~/pages/Account/pages/MyAddress';
import MyFavorites from '~/pages/Account/pages/MyFavorites';

import CustomRoute from './accountRoute';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cesto" component={Basket} />
        <Route path="/entrega" component={Delivery} />
        <Route path="/confirmacao" component={Confirmation} />
        <CustomRoute path="/painel" component={ControlPanel} />
        <CustomRoute path="/entregas" component={PeriodicDelivery} />
        <CustomRoute path="/encomendas" component={MyOrders} />
        <CustomRoute path="/conta" component={MyAccount} />
        <CustomRoute path="/endereco" component={MyAddress} />
        <CustomRoute path="/favoritos" component={MyFavorites} />
      </Switch>
    </BrowserRouter>
  );
}
