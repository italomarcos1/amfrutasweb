import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Container,
  Content,
  CheckoutDetails,
  CheckoutItem,
  Title,
  ConfirmationText,
  ShippingWarning,
  EmptyCartContainer,
} from './styles';

import logo from '~/assets/amfrutas-white.svg';
import alert from '~/assets/alert-circle.svg';
import lock from '~/assets/lock.svg';

import Footer from '~/components/Footer';
import CheckoutHeader from '~/components/CheckoutHeader';
import Item from '~/components/Item';

import { Button, SecureLogin } from '~/components/LoginModal';

import agua1l from '~/assets/products/agua1l@2x.png';

export default function Basket() {
  // const items = [
  //   {
  //     id: 1,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 2,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 3,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 4,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 5,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 6,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 7,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 8,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  //   {
  //     id: 9,
  //     picture: agua1l,
  //     title:
  //       'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
  //     oldPrice: '10.99',
  //     newPrice: '9.80',
  //     amount: 0,
  //   },
  // ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cart = useSelector(state => state.cart.products);

  console.log(cart);

  const history = useHistory();

  const [totalPrice, setTotalPrice] = useState('');

  const calculatePrice = useCallback(() => {
    const price = cart.reduce((totalSum, { newPrice, amount }) => {
      console.tron.log(newPrice);
      console.tron.log(Number(newPrice));
      console.tron.log(amount);
      const formattedPrice = newPrice.replace(',', '.');
      return totalSum + Number(formattedPrice) * amount;
    }, 0);

    setTotalPrice(price);
  }, [cart]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  return (
    <>
      <CheckoutHeader active={1} />
      <Container>
        <Content>
          <div>
            <Title>Cesto de Compras</Title>
            {cart.length !== 0 ? (
              <ul>
                {cart.map((item, index) => (
                  <Item key={item.id} item={item} index={index} />
                ))}
              </ul>
            ) : (
              <EmptyCartContainer>
                <img src={alert} alt="Alert" />
                <strong>Seu cesto de compras está vazio.</strong>
              </EmptyCartContainer>
            )}
          </div>
          <div>
            <Title>Resumo</Title>
            <CheckoutDetails>
              <CheckoutItem>
                <h1>Produtos</h1>
                <h2>{cart.length !== 0 ? `€ ${totalPrice}` : '---'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Economizou</h1>
                <h2>{cart.length !== 0 ? `€ 22,9` : '---'}</h2>
              </CheckoutItem>
              <CheckoutItem style={{ height: 77 }}>
                <h1>
                  O seu crédito de <b>compras anteriores</b> <br />
                  estará disponível no passo seguinte
                </h1>
              </CheckoutItem>
              <CheckoutItem style={{ height: 77 }}>
                <h1>
                  Tem um <b>cupão de desconto?</b> <br />
                  Pode adicioná-lo no passo seguinte
                </h1>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Porte</h1>
                <h2 style={{ color: '#0CB68B' }}>Grátis</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h2>Total</h2>
                <h2 style={{ fontSize: 25, color: '#0CB68B' }}>
                  {cart.length !== 0 ? `€ 179,14` : '---'}
                </h2>
              </CheckoutItem>
              <ConfirmationText>
                A confirmação da sua encomenda será feita <br />
                através de contacto telefónico pelos nossos <br />
                colaboradores no dia da entrega.
              </ConfirmationText>
              <Button
                disabled={cart.length === 0}
                color="#1DC167"
                shadowColor="#17A75B"
                onClick={() => history.push('entrega')}
                style={{ width: 309 }}
              >
                <b>Processar Encomenda</b>
              </Button>
              <SecureLogin style={{ marginTop: 23.5 }}>
                Acesso <img src={lock} alt="Lock" /> Seguro
              </SecureLogin>
            </CheckoutDetails>
            <ShippingWarning>
              Levantamento na loja:
              <b>Grátis</b>
              <br /> Compras até € 30,00:
              <b>Entrega € 5,00</b>
              <br /> Compras acima de € 30,00:
              <b>Entrega Grátis</b>
            </ShippingWarning>
          </div>
        </Content>
      </Container>
      <Footer />
    </>
  );
}
