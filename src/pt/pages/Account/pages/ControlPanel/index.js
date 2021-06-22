import React, { useEffect, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

import detectBrowserLanguage from 'detect-browser-language';

import { InfoContainer, DeliveryAndCardsContainer } from './styles';

import Info from './components/Info';
import MyAddress from './components/MyAddress';
import MyAccount from './components/MyAccount';

import cashback from '~/assets/myAccount/cashback.svg';
import orders from '~/assets/myAccount/orders.svg';
import delivery from '~/assets/myAccount/delivery.svg';
import favorites from '~/assets/myAccount/favorites.svg';

export default function ControlPanel() {
  const history = useHistory();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const isEnglish = useMemo(() => {
    console.log(detectBrowserLanguage());
    const browserLanguage = detectBrowserLanguage();
    const isEng = browserLanguage.split('-')[0] === 'en';
    console.log('isBre-esh');
    console.log(isEng);
    // if (isEnglish) return <Redirect to="/uk" />;
    return isEng;
  }, []);

  const profile = useSelector(state => state.user.profile);

  useEffect(() => window.scrollTo(0, 0), []);

  return isEnglish ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <InfoContainer isDesktop={isDesktop}>
        <Info
          icon={cashback}
          alt="Crédito disponível"
          title={`€ ${
            !!profile
              ? !!profile.cback_credit
                ? profile.cback_credit
                : '0.00'
              : '0.00'
          }`}
          subTitle="Cashback - Crédito disponível"
          titleStyle={{ color: '#0CB68B' }}
          imageStyle={isDesktop ? {} : { width: '20%', marginTop: 5 }}
          noButton={false}
        />
        <Info
          icon={orders}
          alt="Encomendas"
          title="As minhas encomendas"
          titleStyle={isDesktop ? {} : { fontSize: 15, width: '100% ' }}
          imageStyle={isDesktop ? {} : { width: '15%', marginTop: 15 }}
          style={isDesktop ? {} : { marginTop: 20 }}
          subTitle="Você não tem pedidos em andamento"
          onClick={() => history.push('/encomendas')}
        />
      </InfoContainer>
      <InfoContainer isDesktop={isDesktop}>
        <MyAddress />
        <DeliveryAndCardsContainer
          isDesktop={isDesktop}
          style={isDesktop ? {} : { marginTop: 20 }}
        >
          <Info
            icon={delivery}
            alt="Entrega"
            title="Minhas entregas periódicas"
            contentStyle={isDesktop ? {} : { paddingTop: 0 }}
            style={isDesktop ? {} : { paddingTop: 10 }}
            titleStyle={isDesktop ? { fontSize: 20.5 } : { fontSize: 15 }}
            subTitleStyle={isDesktop ? {} : { fontSize: 12 }}
            imageStyle={isDesktop ? {} : { width: '20%', marginTop: 10 }}
            subTitle="Você não tem pedidos em andamento"
            onClick={() => {}}
          />
          <Info
            icon={favorites}
            alt="Favoritos"
            title="Produtos favoritos"
            imageStyle={isDesktop ? {} : { width: '19%' }}
            titleStyle={isDesktop ? {} : { fontSize: 18 }}
            subTitle="Adicione ao cesto de compras"
            onClick={() => history.push('/favoritos')}
          />
        </DeliveryAndCardsContainer>
      </InfoContainer>
      <InfoContainer isDesktop={isDesktop}>
        <MyAccount />
      </InfoContainer>
      <div
        style={
          isDesktop
            ? { width: 840, height: 300 }
            : { width: '100%', height: 100 }
        }
      />
    </>
  );
}
