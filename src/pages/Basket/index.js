import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Content,
  CheckoutDetails,
  CheckoutItem,
  Title,
  ConfirmationText,
  ShippingWarning,
} from './styles';

import logo from '~/assets/amfrutas-white.svg';
import alert from '~/assets/alert-circle.svg';
import lock from '~/assets/lock.svg';

import Footer from '~/components/Footer';
import CheckoutHeader from '~/components/CheckoutHeader';
import Item from '~/components/Item';
import ItemsList from '~/components/ItemsList';
import EmptyCartContainer from '~/components/EmptyCartContainer';
import Toast from '~/components/Toast';
import LoginModal from '~/pages/LoginModal';

import { processOrder } from '~/store/modules/cart/actions';

import { formatPrice } from '~/utils/calculatePrice';

import { Button, SecureLogin } from '~/components/LoginModal';

export default function Basket() {
  const { products, price, saved } = useSelector(state => state.cart);
  const signed = useSelector(state => state.auth.signed);
  const dispatch = useDispatch();
  const history = useHistory();

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loginModal, setLoginModal] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(processOrder(false));
  }, []);

  const handlePagination = useCallback(() => {
    const pageIndex = 8 * (currentPage - 1);
    const newPage = products.slice(pageIndex, pageIndex + 8);

    setPaginatedProducts(newPage);
  }, [currentPage, products]);

  useEffect(() => {
    handlePagination();
  }, [products, handlePagination]);

  useEffect(() => {
    dispatch(processOrder(false));
  }, [dispatch]);

  const handleProcessOrder = useCallback(() => {
    if (!signed) {
      setLoginModal(true);
      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
      }, 2800);

      return;
    }

    dispatch(processOrder(true));
    history.push('/entrega');
  }, [dispatch, history, signed]);

  return (
    <>
      <CheckoutHeader active={1} />
      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
      {toastVisible && (
        <Toast
          status="Você deve fazer login ou se cadastrar antes de prosseguir."
          color="#1DC167"
        />
      )}
      <Container>
        <Content>
          <div>
            <Title>Cesto de Compras</Title>
            {!loginModal && products.length !== 0 ? (
              <ItemsList
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                containerHeight={708}
              >
                {paginatedProducts.map((item, index) => {
                  return <Item key={item.id} item={item} index={index} />;
                })}
              </ItemsList>
            ) : (
              <EmptyCartContainer message="Seu cesto de compras está vazio." />
            )}
          </div>
          <div>
            <Title>Resumo</Title>
            <CheckoutDetails>
              <CheckoutItem>
                <h1>Produtos</h1>
                <h2>{products.length !== 0 ? `€ ${price}` : '---'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Economizou</h1>
                <h2>
                  {products.length !== 0
                    ? `€ ${formatPrice(saved - price)}`
                    : '---'}
                </h2>
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
                  {products.length !== 0 ? `€ ${price}` : '---'}
                </h2>
              </CheckoutItem>
              <ConfirmationText>
                A confirmação da sua encomenda será feita <br />
                através de contacto telefónico pelos nossos <br />
                colaboradores no dia da entrega.
              </ConfirmationText>
              <Button
                disabled={products.length === 0}
                color="#1DC167"
                shadowColor="#17A75B"
                onClick={() => handleProcessOrder()}
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
