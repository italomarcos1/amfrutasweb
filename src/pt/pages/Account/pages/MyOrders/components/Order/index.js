import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
  ReviewContainer,
  ReOrderContainer,
} from './styles';

import { Button } from '~/pt/components/LoginModal';

import CheckoutItem from '../OrderItem';
import StatusContainer from '../StatusContainer';

import Input from '~/pt/components/Input';
import ItemsList from '~/pt/components/ItemsList';

// import star from '~/assets/star.svg';

import cancelado from '~/assets/orders/cancelado.svg';
import completo from '~/assets/orders/completo.svg';

import novo from '~/assets/orders/novo.svg';
import setaDown from '~/assets/orders/seta-down.svg';
import setaUp from '~/assets/orders/seta-up.svg';
import starOn from '~/assets/orders/starOn.svg';
import starOff from '~/assets/orders/starOff.svg';

import Toast from '~/pt/components/Toast';

import backend from '~/services/api';
import { customCalculatePrice, formatPrice } from '~/utils/calculatePrice';

import { pushToCart, updatePages } from '~/store/modules/cart/actions';

// import { products } from '~/data';

// new
// approved
// onCourse
// Completo
// Cancelado

export default function Order({ order, isOpen, setOrder }) {
  const { id, total, date, scheduledShipping, statuses, review_rate } = order;

  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const [transaction, setTransaction] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  const [rate, setRate] = useState(
    review_rate === 'Sem avaliação' ? '---' : review_rate
  );
  const [review, setReview] = useState('');
  const [sending, setSending] = useState(false);

  const [startHour, setStartHour] = useState('00:00');

  const [endHour, setEndHour] = useState('00:00');
  const [scheduledDate, setScheduledDate] = useState('---');

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState('0.00');
  const [savedPrice, setSavedPrice] = useState('0.00');

  const [currentStatus, setCurrentStatus] = useState(statuses[0].name);
  const [reordering, setIsReordering] = useState(false);
  const [cancelling, setIsCancelling] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastStatus, setToastStatus] = useState('');
  const [toastColor, setToastColor] = useState('#1DC167');

  useEffect(() => {
    if (!scheduledShipping) return;
    const formattingSchedule = scheduledShipping.split(' ');
    const formattingStartHour = formattingSchedule[1].substring(1);
    const formattingEndHour = formattingSchedule[3].substring(
      0,
      formattingSchedule[3].length - 2
    );
    setScheduledDate(formattingSchedule[0]);
    setStartHour(formattingStartHour);
    setEndHour(formattingEndHour);
  }, [scheduledShipping]);

  const handleOpenOrder = useCallback(() => {
    if (isOpen === id) setOrder(0);
    else setOrder(id);
  }, [id, isOpen, setOrder]);

  const loadTransaction = useCallback(async () => {
    if (isOpen !== id) return;
    setLoading(true);
    try {
      const {
        data: { data },
      } = await backend.get(`/clients/transactions/${id}`);

      setTransaction(data);
      setShippingAddress(data.shippingAddress);
      const { formattedSavedPrice, formattedPrice } = customCalculatePrice(
        data.products
      );
      setPrice(formattedPrice);
      setSavedPrice(formatPrice(formattedSavedPrice - formattedPrice));

      const currentReview = data.review;
      setRate(!!currentReview ? currentReview.rate : '---');
      setReview(!!currentReview ? currentReview.review : '');

      setLoading(false);
    } catch {
      alert('Erro no carregamento da transação, confira sua conexão.');
      setLoading(false);
    }
  }, [id, isOpen]);

  useEffect(() => {
    loadTransaction();
  }, [isOpen, loadTransaction]);

  const handleSubmitRating = useCallback(async () => {
    try {
      if (!review || rate === '---') return;

      setSending(true);

      await backend.post(`/clients/transactions/${id}/reviews`, {
        review,
        rate,
      });

      setToastColor('#1DC167');
      setToastStatus('Avaliação adicionada com sucesso.');

      setReview('');

      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2800);
    } catch (err) {
      console.log(err);
      setToastVisible(true);
      setToastStatus('Erro ao adicionar a avaliação.');
      setToastColor('#f56060');

      setSending(false);

      setTimeout(() => {
        setToastVisible(false);
      }, 2800);
    }
  }, [id, rate, review]);

  const handleReorder = useCallback(async () => {
    try {
      if (!transaction) return;
      setIsReordering(true);
      const { products } = transaction;

      const formattedProducts = products.map(({ id: product_id, qty }) => ({
        product_id,
        quantity: qty,
      }));

      const {
        data: { data },
      } = await backend.post('/cart', {
        uuid: profile.uuid,
        products: formattedProducts,
      });

      let prds = Object.values(data);

      if (typeof prds[0] === 'string') {
        const formattedProduct = {
          ...data,
          product: data.options.product,
        };

        delete formattedProduct.options;

        prds = [formattedProduct];
      } else {
        prds = prds.map(p => {
          const currentProduct = p.options.product;
          delete p.options;

          return { ...p, product: currentProduct };
        });
      }

      dispatch(pushToCart(prds));

      setToastStatus('Os produtos foram adicionados ao carrinho.');
      setToastColor('#1dc167');

      setToastVisible(true);
    } catch (err) {
      console.log(err);
      setToastStatus('Erro ao adicionar  produtos no carrinho.');
      setToastColor('#f56060');
      setToastVisible(true);
    } finally {
      setIsReordering(false);

      setTimeout(() => {
        setToastVisible(false);
      }, 2800);
    }
  }, [transaction, dispatch, profile]);

  const handleCancel = useCallback(async () => {
    try {
      if (!transaction) return;

      setIsCancelling(true);
      await backend.post(`/clients/transactions/statuses/${id}`);

      setToastStatus('Sua encomenda foi cancelada.');

      setToastColor('#1dc167');

      setToastVisible(true);
      setCurrentStatus('Cancelado');
      setIsCancelling(false);
    } catch (err) {
      console.log(err);
      setToastStatus('Erro ao cancelar a encomenda.');
      setToastColor('#f56060');
      setToastVisible(true);
    } finally {
      setIsCancelling(false);

      setTimeout(() => {
        setToastVisible(false);
      }, 2800);
    }
  }, [id, transaction]);

  return (
    <>
      <Container
        open={isOpen === id}
        style={id !== 1 ? { marginTop: 20 } : {}}
        onSubmit={() => {}}
      >
        <OrderStatus>
          <StatusIcon
            src={
              currentStatus === 'Completo'
                ? completo
                : currentStatus === 'Cancelado'
                ? cancelado
                : novo
            }
          />
          <Info>
            <h1>
              {currentStatus === 'Completo'
                ? 'Completo'
                : currentStatus === 'Cancelado'
                ? 'Cancelado'
                : 'Novo'}
            </h1>
            <OrderInfoContainer>
              <OrderInfo>
                <strong>Entrega programada para</strong>
                <strong>
                  <b>
                    {!!scheduledShipping
                      ? `${scheduledDate} entre ${startHour}h e ${endHour}h`
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
                  <b>€&nbsp;{formatPrice(total)}</b>
                </strong>
              </OrderInfo>
              <OrderInfo>
                <strong>Avaliação do serviço</strong>
                <strong>
                  <b>{rate}</b>
                </strong>
              </OrderInfo>
            </OrderInfoContainer>
            <Separator />
            <StatusContainer status={currentStatus} />
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
                        <small>
                          {shippingAddress.destination_name}&nbsp;
                          {shippingAddress.destination_last_name}
                        </small>
                        <small>{shippingAddress.address}</small>
                        <small>
                          {shippingAddress.number} {shippingAddress.zipcode}
                        </small>
                        <small>
                          {shippingAddress.district}, {shippingAddress.city}
                        </small>
                        <small>{shippingAddress.country}</small>
                        <small>
                          {!!profile.cellphone
                            ? profile.cellphone
                            : '00 000 00 00'}
                        </small>
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
                      <small>
                        <b>Método da Compra</b>
                      </small>
                      <small>{transaction.origin}</small>
                    </ShippingInfo>
                    <ShippingInfo open={isOpen === id}>
                      <small>
                        <b>Resumo do pedido</b>
                      </small>
                      <small>Produtos</small>
                      <small>Economizou</small>
                      <small>Crédito utilizado</small>
                      <small>Cupom de desconto</small>
                      <small>Porte</small>
                      <small>Crédito (CashBack)</small>
                      <small style={{ fontFamily: 'SFProBold' }}>Total</small>
                    </ShippingInfo>
                    <ShippingInfo open={isOpen === id}>
                      <small>&nbsp;</small>
                      <small style={{ color: '#0CB68B' }}>€&nbsp;{price}</small>
                      <small style={{ color: '#0CB68B' }}>
                        €&nbsp;{savedPrice}
                      </small>
                      <small style={{ color: '#F64847' }}>
                        €&nbsp;
                        {transaction.cback_used === 0
                          ? '0.00'
                          : transaction.cback_used}
                      </small>
                      <small style={{ color: '#F64847' }}>
                        €&nbsp;
                        {transaction.discount === 0
                          ? '0.00'
                          : transaction.discount}
                      </small>
                      <small>
                        {!!scheduledShipping ? (
                          `€ ${transaction.shipping}.00`
                        ) : (
                          <b style={{ color: '#0CB68B' }}>Grátis</b>
                        )}
                      </small>
                      <small
                        style={{
                          color: '#FF9D22',
                          fontFamily: 'SFProBold',
                        }}
                      >
                        €&nbsp;
                        {transaction.cback_received}
                      </small>
                      <small style={{ fontFamily: 'SFProBold' }}>
                        €&nbsp;{transaction.total}
                      </small>
                    </ShippingInfo>
                  </div>
                </>
              )}
            </div>
            <ReOrderContainer isOpen={isOpen === id}>
              <Button
                color="#1DC167"
                style={{ margin: '0 auto', width: 370 }}
                shadowColor="#17A75B"
                bold
                onClick={handleReorder}
                disabled={reordering || cancelling}
              >
                {reordering || cancelling ? (
                  <FaSpinner color="#fff" size={20} />
                ) : (
                  'Encomendar Novamente'
                )}
              </Button>
              {currentStatus !== 'Cancelado' && (
                <Button
                  color="#F03F39"
                  style={{ margin: '0 auto', width: 370 }}
                  shadowColor="#D02B21"
                  bold
                  onClick={handleCancel}
                  disabled={reordering || cancelling}
                >
                  {reordering || cancelling ? (
                    <FaSpinner color="#fff" size={20} />
                  ) : (
                    'Cancelar Encomenda'
                  )}
                </Button>
              )}
            </ReOrderContainer>

            <ItemsList
              length={!!transaction ? transaction.products.length : 8}
              breakpoint={8}
              style={{ width: '100%', height: 'auto' }}
            >
              {!!transaction &&
                transaction.products.map((item, index) => (
                  <CheckoutItem
                    key={item.id}
                    item={item}
                    index={index}
                    isDesktop
                  />
                ))}
            </ItemsList>

            <div
              style={
                isOpen === id
                  ? { display: 'block', marginTop: 17 }
                  : { display: 'none' }
              }
            >
              <RatingTitle>Avaliação do Serviço</RatingTitle>
              <StarsContainer>
                <button onClick={() => setRate(1)} type="button">
                  <img src={rate >= 1 ? starOn : starOff} alt="" />
                </button>
                <button onClick={() => setRate(2)} type="button">
                  <img src={rate >= 2 ? starOn : starOff} alt="" />
                </button>
                <button onClick={() => setRate(3)} type="button">
                  <img src={rate >= 3 ? starOn : starOff} alt="" />
                </button>
                <button onClick={() => setRate(4)} type="button">
                  <img src={rate >= 4 ? starOn : starOff} alt="" />
                </button>
                <button onClick={() => setRate(5)} type="button">
                  <img src={rate === 5 ? starOn : starOff} alt="" />
                </button>
              </StarsContainer>
            </div>
            <ReviewContainer isOpen={isOpen === id}>
              <Input
                name="comment"
                title="Deixe seu comentário"
                customWidth={660}
                onChange={e => setReview(e.target.value)}
                value={review}
                placeholder="Digite seu comentário aqui"
              />
              <button
                type="button"
                disabled={!review || sending}
                onClick={handleSubmitRating}
              >
                Enviar
              </button>
            </ReviewContainer>
            {toastVisible && (
              <Toast status={toastStatus} color={toastColor} isDesktop />
            )}
          </>
        )}
      </Container>
    </>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    statuses: PropTypes.oneOfType([PropTypes.array]),
    number: PropTypes.string,
    total: PropTypes.number,
    date: PropTypes.string,
    review_rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    scheduledShipping: PropTypes.string,
    startHour: PropTypes.string,
    endHour: PropTypes.string,
  }).isRequired,
  setOrder: PropTypes.func.isRequired,
  isOpen: PropTypes.number.isRequired,
};
