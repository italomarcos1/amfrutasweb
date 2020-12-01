import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

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
  LoadingContainer,
} from './styles';

import CheckoutItem from '../OrderItem';
import StatusContainer from '../StatusContainer';

import Input from '~/components/Input';
import ItemsList from '~/components/ItemsList';

import star from '~/assets/star.svg';

import cancelado from '~/assets/orders/cancelado.svg';
import completo from '~/assets/orders/completo.svg';

import novo from '~/assets/orders/novo.svg';
import setaDown from '~/assets/orders/seta-down.svg';
import setaUp from '~/assets/orders/seta-up.svg';
import starOn from '~/assets/orders/starOn.svg';
import starOff from '~/assets/orders/starOff.svg';

import backend from '~/services/api';
import { calculatePrice, formatPrice } from '~/utils/calculatePrice';

import { updatePages } from '~/store/modules/cart/actions';

// import { products } from '~/data';

// new
// approved
// onCourse
// Completo
// Cancelado

export default function Order({ order, isOpen, setOrder }) {
  const { id, total, date, scheduledShipping, statuses } = order;

  const dispatch = useDispatch();

  const [transaction, setTransaction] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  const [productRating, setProductRating] = useState(5);
  const [startHour, setStartHour] = useState('00:00');

  const [endHour, setEndHour] = useState('00:00');

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState('0.00');
  const [savedPrice, setSavedPrice] = useState('0.00');

  useEffect(() => {
    if (!scheduledShipping) return;
    const formattingSchedule = scheduledShipping.split(' ');
    const formattingStartHour = formattingSchedule[1].substring(1);
    const formattingEndHour = formattingSchedule[3].substring(
      0,
      formattingSchedule[3].length - 2
    );
    setStartHour(formattingStartHour);
    setEndHour(formattingEndHour);
  }, [scheduledShipping]);

  const handleOpenOrder = useCallback(() => {
    if (isOpen === id) setOrder(0);
    else setOrder(id);
  }, [id, isOpen, setOrder]);

  const handlePagination = useCallback(() => {
    if (!transaction) return;
    const { products } = transaction;
    const pageIndex = 8 * (currentPage - 1);
    const newPage = products.slice(pageIndex, pageIndex + 8);

    const totalPages = Math.ceil(products.length / 8);

    dispatch(updatePages(totalPages));

    setPaginatedProducts(newPage);
  }, [currentPage, transaction, dispatch]);

  const loadTransaction = useCallback(async () => {
    if (isOpen !== id) return;
    setLoading(true);
    try {
      const {
        data: { data },
      } = await backend.get(`/clients/transactions/${id}`);

      setTransaction(data);
      setShippingAddress(data.shippingAddress);

      const { formattedSavedPrice, formattedPrice } = calculatePrice(
        data.products
      );
      setPrice(formattedPrice);
      setSavedPrice(formatPrice(formattedSavedPrice - formattedPrice));

      setLoading(false);
    } catch {
      alert('Erro no carregamento da transação, confira sua conexão.');
      setLoading(false);
    }
  }, [id, isOpen]);

  useEffect(() => {
    handlePagination();
  }, [transaction, handlePagination]);

  useEffect(() => {
    loadTransaction();
  }, [isOpen, loadTransaction]);

  return (
    <Container
      open={isOpen === id}
      style={id !== 1 ? { marginTop: 20 } : {}}
      onSubmit={() => {}}
    >
      <OrderStatus>
        <StatusIcon
          src={
            statuses[0].name === 'Completo'
              ? completo
              : statuses[0].name === 'Cancelado'
              ? cancelado
              : novo
          }
        />
        <Info>
          <h1>
            {statuses[0].name === 'Completo'
              ? 'Completo'
              : statuses[0].name === 'Cancelado'
              ? 'Cancelado'
              : 'Novo'}
          </h1>
          <OrderInfoContainer>
            <OrderInfo>
              <strong>Entrega programada para</strong>
              <strong>
                <b>
                  {!!scheduledShipping
                    ? `${date} entre ${startHour}h e ${endHour}h`
                    : '---'}
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
                <b>{id}</b>
              </strong>
            </OrderInfo>
            <OrderInfo>
              <strong>Valor do pedido</strong>
              <strong>
                <b>€ {total}</b>
              </strong>
            </OrderInfo>
            <OrderInfo>
              <strong>Avaliação do serviço</strong>
              <strong>
                <b>{productRating}</b>
              </strong>
            </OrderInfo>
          </OrderInfoContainer>
          <Separator />
          <StatusContainer status={statuses[0].name} />
        </Info>
        <OpenTab onClick={handleOpenOrder}>
          <img src={isOpen === id ? setaUp : setaDown} alt="" />
        </OpenTab>
      </OrderStatus>
      {isOpen === id && (
        <>
          <div
            style={
              loading
                ? { marginTop: 12.5 }
                : { marginLeft: 69, marginTop: 12.5 }
            }
          >
            {loading ? (
              <LoadingContainer>
                <FaSpinner color="#666" size={42} />
                <strong>Carregando os dados da encomenda, aguarde...</strong>
              </LoadingContainer>
            ) : (
              <>
                <ShippingInfoSeparator open={isOpen === id} />
                <div
                  style={{
                    display: 'flex',
                    width: 590,
                    justifyContent: 'space-between',
                  }}
                >
                  {!!scheduledShipping && (
                    <ShippingInfo open={isOpen === id}>
                      <small>
                        <b>Endereço de envio</b>
                      </small>
                      <small>Michel Oliveira</small>
                      <small>{shippingAddress.address}</small>
                      <small>
                        {shippingAddress.number} {shippingAddress.zipcode}
                      </small>
                      <small>
                        {shippingAddress.district}, {shippingAddress.city}
                      </small>
                      <small>Portugal</small>
                      <small>92 760 94 40</small>
                    </ShippingInfo>
                  )}
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
                    <small style={{ color: '#0CB68B' }}>€&nbsp;{price}</small>
                    <small style={{ color: '#0CB68B' }}>
                      €&nbsp;{savedPrice}
                    </small>
                    <small style={{ color: '#F64847' }}>€&nbsp;5,12</small>
                    <small style={{ color: '#F64847' }}>€&nbsp;10,00</small>
                    <small>Grátis</small>
                    <small style={{ fontFamily: 'SFProBold' }}>164,02</small>
                  </ShippingInfo>
                </div>
              </>
            )}
          </div>

          <ItemsList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            containerWidth="100%"
            style={{ backgroundColor: '#00000000' }}
          >
            {paginatedProducts.map((item, index) => (
              <CheckoutItem key={item.id} item={item} index={index} />
            ))}
          </ItemsList>

          <div
            style={
              isOpen === id
                ? { display: 'block', marginTop: 89 }
                : { display: 'none' }
            }
          >
            <RatingTitle>Avaliação do Serviço</RatingTitle>
            <StarsContainer>
              <button onClick={() => setProductRating(1)} type="button">
                <img src={productRating >= 1 ? starOn : starOff} alt="" />
              </button>
              <button onClick={() => setProductRating(2)} type="button">
                <img src={productRating >= 2 ? starOn : starOff} alt="" />
              </button>
              <button onClick={() => setProductRating(3)} type="button">
                <img src={productRating >= 3 ? starOn : starOff} alt="" />
              </button>
              <button onClick={() => setProductRating(4)} type="button">
                <img src={productRating >= 4 ? starOn : starOff} alt="" />
              </button>
              <button onClick={() => setProductRating(5)} type="button">
                <img src={productRating === 5 ? starOn : starOff} alt="" />
              </button>
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
        </>
      )}
    </Container>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    statuses: PropTypes.oneOfType([PropTypes.array]),
    number: PropTypes.string,
    total: PropTypes.number,
    date: PropTypes.string,
    scheduledShipping: PropTypes.string,
    startHour: PropTypes.string,
    endHour: PropTypes.string,
  }).isRequired,
  setOrder: PropTypes.func.isRequired,
  isOpen: PropTypes.number.isRequired,
};
