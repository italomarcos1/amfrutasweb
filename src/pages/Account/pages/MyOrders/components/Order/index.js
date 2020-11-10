import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  OrderStatus,
  Info,
  OrderInfoContainer,
  OrderInfo,
  Separator,
  StatusIcon,
  OpenTab,
  ShippingInfoSeparator,
  ShippingInfo,
  RatingTitle,
  StarsContainer,
} from './styles';

import CheckoutItem from '../Item';
import StatusContainer from '../StatusContainer';

import Input from '~/components/Input';

import star from '~/assets/star.svg';

import cancelado from '~/assets/orders/cancelado.svg';
import completo from '~/assets/orders/completo.svg';

import novo from '~/assets/orders/novo.svg';
import setaDown from '~/assets/orders/seta-down.svg';
import setaUp from '~/assets/orders/seta-up.svg';
import starOne from '~/assets/orders/star-1.svg';
import starTwo from '~/assets/orders/star-2.svg';

import { products } from '~/data';

// new
// approved
// onCourse
// completed
// cancelled

export default function Order({ order, isOpen, setOrder }) {
  const {
    id,
    status,
    number,
    price,
    date,
    deliveryDate,
    startHour,
    endHour,
    rating,
  } = order;

  const handleOpenOrder = useCallback(() => {
    if (isOpen === id) setOrder(0);
    else setOrder(id);
  }, [id, isOpen, setOrder]);

  return (
    <Container
      open={isOpen === id}
      style={id !== 1 ? { marginTop: 20 } : {}}
      onSubmit={() => {}}
    >
      <OrderStatus>
        <StatusIcon
          src={
            status === 'completed'
              ? completo
              : status === 'cancelled'
              ? cancelado
              : novo
          }
        />
        <Info>
          <h1>
            {status === 'completed'
              ? 'Completo'
              : status === 'cancelled'
              ? 'Cancelado'
              : 'Novo'}
          </h1>
          <OrderInfoContainer>
            <OrderInfo>
              <strong>Entrega progamada para</strong>
              <strong>
                <b>
                  {deliveryDate} entre {startHour}h e {endHour}h
                </b>
              </strong>
            </OrderInfo>
            <OrderInfo>
              <strong>Data do pedido</strong>
              <strong>
                <b>{date}</b>
              </strong>
            </OrderInfo>
            <OrderInfo>
              <strong>Número do pedido</strong>
              <strong>
                <b>{number}</b>
              </strong>
            </OrderInfo>
            <OrderInfo>
              <strong>Valor do pedido</strong>
              <strong>
                <b>€ {price}</b>
              </strong>
            </OrderInfo>
            <OrderInfo>
              <strong>Avaliação do serviço</strong>
              <strong>
                <b>{rating}</b>
              </strong>
            </OrderInfo>
          </OrderInfoContainer>
          <Separator />
          <StatusContainer status={status} />
        </Info>
        <OpenTab onClick={handleOpenOrder}>
          <img src={isOpen === id ? setaUp : setaDown} alt="" />
        </OpenTab>
      </OrderStatus>
      <div style={{ marginLeft: 69, marginTop: 12.5 }}>
        <ShippingInfoSeparator open={isOpen === id} />
        <div
          style={{
            display: 'flex',
            width: 590,
            justifyContent: 'space-between',
          }}
        >
          <ShippingInfo open={isOpen === id}>
            <small>
              <b>Endereço de envio</b>
            </small>
            <small>Michel Oliveira</small>
            <small>Rua 7 de Junho</small>
            <small>23 RC 2740-164</small>
            <small>Porto Salvo</small>
            <small>Portugal</small>
            <small>92 760 94 40</small>
          </ShippingInfo>
          <ShippingInfo
            open={isOpen === id}
            style={{ marginRight: 25, marginLeft: 15 }}
          >
            <small>
              <b>Forma de pagamento</b>
            </small>
            <small>Dinheiro na entrega</small>
          </ShippingInfo>
          <ShippingInfo open={isOpen === id}>
            <small>
              <b>Resumo do pedido</b>
            </small>
            <small>Subtotal dos produtos</small>
            <small>Economizou</small>
            <small>Crédito utilizado</small>
            <small>Cupom de desconto</small>
            <small>Porte</small>
            <small style={{ fontFamily: 'SFProBold' }}>Total</small>
          </ShippingInfo>
          <ShippingInfo open={isOpen === id}>
            <small>&nbsp;</small>
            <small style={{ color: '#0CB68B' }}>€ 179,14</small>
            <small style={{ color: '#0CB68B' }}>€ 22,09</small>
            <small style={{ color: '#F64847' }}>€ 5,12</small>
            <small style={{ color: '#F64847' }}>€ 10,00</small>
            <small>Grátis</small>
            <small style={{ fontFamily: 'SFProBold' }}>164,02</small>
          </ShippingInfo>
        </div>
      </div>
      <ul>
        {products.map(p => (
          <CheckoutItem item={p} />
        ))}
      </ul>
      <div
        style={
          isOpen === id
            ? { display: 'block', marginTop: 29 }
            : { display: 'none' }
        }
      >
        <RatingTitle>Avaliação do Serviço</RatingTitle>
        <StarsContainer>
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
        </StarsContainer>
      </div>
      <Input
        name="comment"
        title="Deixe seu comentário"
        customWidth={760}
        style={
          isOpen === id
            ? { display: 'flex', marginTop: 20 }
            : { display: 'none', marginTop: 20 }
        }
        placeholder="Digite seu comentário aqui"
      />
    </Container>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    number: PropTypes.string,
    price: PropTypes.string,
    date: PropTypes.string,
    deliveryDate: PropTypes.string,
    startHour: PropTypes.string,
    endHour: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  setOrder: PropTypes.func.isRequired,
  isOpen: PropTypes.number.isRequired,
};
