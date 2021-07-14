import React from 'react';
import { Switch } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Home from '~/pt/pages/Home';
import UkHome from '~/uk/pages/Home';

import Contents from '~/pt/pages/Contents';
import UkContents from '~/uk/pages/Contents';

import Content from '~/pt/pages/Contents/pages/ViewContent';
import UkContent from '~/uk/pages/Contents/pages/ViewContent';

import Basket from '~/pt/pages/Basket';
import UkBasket from '~/uk/pages/Basket';

import Delivery from '~/pt/pages/Delivery';
import UkDelivery from '~/uk/pages/Delivery';

import Confirmation from '~/pt/pages/Confirmation';
import UkConfirmation from '~/uk/pages/Confirmation';

import AppleSuccessful from '~/pt/pages/LoginModal/pages/AppleLoginSuccessful';
import UkAppleSuccessful from '~/uk/pages/LoginModal/pages/AppleLoginSuccessful';

import IsMobile from '~/pt/pages/IsMobile';
import UkIsMobile from '~/uk/pages/IsMobile';

import Menu from '~/pt/pages/Menu';
import UkMenu from '~/uk/pages/Menu';

import ControlPanel from '~/pt/pages/Account/pages/ControlPanel';
import UkControlPanel from '~/uk/pages/Account/pages/ControlPanel';

import PeriodicDelivery from '~/pt/pages/Account/pages/PeriodicDelivery';
import UkPeriodicDelivery from '~/uk/pages/Account/pages/PeriodicDelivery';

import MyOrders from '~/pt/pages/Account/pages/MyOrders';
import UkMyOrders from '~/uk/pages/Account/pages/MyOrders';

import MyAccount from '~/pt/pages/Account/pages/MyAccount';
import UkMyAccount from '~/uk/pages/Account/pages/MyAccount';

import MyAddress from '~/pt/pages/Account/pages/MyAddress';
import UkMyAddress from '~/uk/pages/Account/pages/MyAddress';

import MyFavorites from '~/pt/pages/Account/pages/MyFavorites';
import UkMyFavorites from '~/uk/pages/Account/pages/MyFavorites';

import Products from '~/pt/pages/Products/pages/ListProducts';
import UkProducts from '~/uk/pages/Products/pages/ListProducts';

import Product from '~/pt/pages/Products/pages/ViewProduct';
import UkProduct from '~/uk/pages/Products/pages/ViewProduct';

import ProductMobile from '~/pt/pages/Products/pages/ViewProductMobile';
import UkProductMobile from '~/uk/pages/Products/pages/ViewProductMobile';

import ProductsPerCategory from '~/pt/pages/Products/pages/ListProductsPerCategory';
import UkProductsPerCategory from '~/uk/pages/Products/pages/ListProductsPerCategory';

import Promotions from '~/pt/pages/Promotions';
import UkPromotions from '~/uk/pages/Promotions';

import Route from './route';
import AccountRoute from './accountRoute';
import UkAccountRoute from './ukAccountRoute';
import ProductsRoute from './productsRoute';
import UkProductsRoute from './ukProductsRoute';

export default function Routes() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/uk" exact component={UkHome} />

        <Route path="/cliente/apple/callback" component={AppleSuccessful} />
        <Route
          path="/cliente/apple/callback/uk"
          component={UkAppleSuccessful}
        />

        <Route path="/updating" exact component={IsMobile} />

        <Route path="/menu" exact component={Menu} />
        <Route path="/menu/uk" component={UkMenu} />

        <Route path="/conteudos" component={Contents} />
        <Route path="/uk/conteudos" component={UkContents} />

        <Route path="/cesto" component={Basket} />
        <Route path="/basket" component={UkBasket} />

        <Route path="/entrega" component={Delivery} isPrivate />
        <Route path="/delivery" component={UkDelivery} isPrivate />

        <Route path="/confirmacao" component={Confirmation} isPrivate />
        <Route path="/confirmation" component={UkConfirmation} isPrivate />

        <AccountRoute path="/painel" component={ControlPanel} isPrivate />
        <UkAccountRoute
          path="/dashboard"
          component={UkControlPanel}
          isPrivate
        />

        <AccountRoute path="/entregas" component={PeriodicDelivery} isPrivate />
        <UkAccountRoute
          path="/deliveries"
          component={UkPeriodicDelivery}
          isPrivate
        />

        <AccountRoute path="/encomendas" component={MyOrders} isPrivate />
        <UkAccountRoute path="/orders" component={UkMyOrders} isPrivate />

        <AccountRoute path="/conta" component={MyAccount} isPrivate />
        <UkAccountRoute path="/account" component={UkMyAccount} isPrivate />

        <AccountRoute path="/endereco" component={MyAddress} isPrivate />
        <UkAccountRoute path="/address" component={UkMyAddress} isPrivate />

        <AccountRoute path="/favoritos" component={MyFavorites} isPrivate />
        <UkAccountRoute path="/favorites" component={UkMyFavorites} isPrivate />

        <ProductsRoute path="/produtos" exact component={Products} />
        <UkProductsRoute path="/products" exact component={UkProducts} />

        <ProductsRoute
          path="/produto"
          component={isDesktop ? Product : ProductMobile}
        />
        <ProductsRoute
          path="/product"
          component={isDesktop ? UkProduct : UkProductMobile}
        />

        <Route path="/produtos/promocoes" component={Promotions} />
        <Route path="/products/promotions" component={UkPromotions} />

        {/* vai dar ruim */}
        <ProductsRoute path="/produtos" component={ProductsPerCategory} />
        <ProductsRoute path="/products" component={UkProductsPerCategory} />

        <Route path="/conteudo" component={Content} />
        <Route path="/uk/conteudo" component={UkContent} />
      </Switch>
    </>
  );
}
