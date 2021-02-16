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
  Button,
  LoadingContainer,
  ShippingInfo,
} from './styles';

import { Button as ReOrderButton } from '~/components/LoginModal';

import { customCalculatePrice, formatPrice } from '~/utils/calculatePrice';

import { pushToCart, updatePages } from '~/store/modules/cart/actions';

import StatusContainer from '../StatusContainer';
import ItemsList from '~/components/ItemsList';
import Toast from '~/components/Toast';
import CheckoutItem from '~/pages/Account/pages/MyOrders/components/OrderItem';

import backend from '~/services/api';

export default function Order({ order, isOpen, setOrder, index: orderIndex }) {
  const { id, total, date, scheduledShipping, statuses } = order;

  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const [transaction, setTransaction] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastStatus, setToastStatus] = useState('');
  const [toastColor, setToastColor] = useState('#1DC167');

  const [startHour, setStartHour] = useState('00:00');

  const [endHour, setEndHour] = useState('00:00');

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState('0.00');
  const [savedPrice, setSavedPrice] = useState('0.00');

  const [currentContainerHeight, setCurrentContainerHeight] = useState(
    paginatedProducts.length * 167 - 20
  );

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

      const { formattedSavedPrice, formattedPrice } = customCalculatePrice(
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

  const handleReorder = useCallback(async () => {
    try {
      if (!transaction) return;

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
      setTimeout(() => {
        setToastVisible(false);
      }, 2800);
    }
  }, [transaction, dispatch, profile]);

  return (
    <>
      <Container
        index={orderIndex}
        style={
          isOpen === id
            ? { borderBottom: 'none', height: 'auto' }
            : { height: 193 }
        }
      >
        <StatusContainer initialStatus={statuses[0].name} id={id} disabled />
        <OrderStatus
          style={isOpen === id ? { height: 159.5 } : { height: 139.5 }}
        >
          <Info>
            <OrderInfoContainer>
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
                <strong>Data do pedido</strong>
                <strong>
                  <b>{date}</b>
                </strong>
              </OrderInfo>
            </OrderInfoContainer>
            <OrderInfoContainer style={{ marginTop: 20, paddingRight: 0 }}>
              <OrderInfo style={{ width: 170 }}>
                <strong>Entrega programada para</strong>
                <strong>
                  <b>
                    {!!scheduledShipping
                      ? `${date} entre ${startHour}h e ${endHour}h`
                      : '---'}
                  </b>
                </strong>
              </OrderInfo>
              <Button onClick={handleOpenOrder}>
                {/* <img src={bag} alt="" /> */}
                <small>Ver encomenda</small>
              </Button>
            </OrderInfoContainer>
          </Info>
        </OrderStatus>
        {isOpen === id && (
          <>
            <div
              style={{
                marginLeft: -1,
                width: '100%',
                border: '1px solid #ccc',
                borderTop: 'none',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                paddingBottom: 17,
                // backgroundColor: '#f90',
              }}
            >
              {loading ? (
                <LoadingContainer>
                  <FaSpinner color="#666" size={38} />
                  <strong>Carregando os dados da encomenda, aguarde...</strong>
                </LoadingContainer>
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
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
                    <ShippingInfo open={isOpen === id}>
                      <small>
                        <b>Forma de pagamento</b>
                      </small>
                      <small>Dinheiro na entrega</small>
                      <small>
                        <b>Método da Compra</b>
                      </small>
                      <small>{transaction.origin}</small>
                    </ShippingInfo>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <ShippingInfo open={isOpen === id}>
                        <small>
                          <b>Resumo do pedido</b>
                        </small>
                        <small>Produtos</small>
                        <small>Economizou</small>
                        <small>Crédito utilizado</small>
                        <small>Cupom de desconto</small>
                        <small>Porte</small>
                        <small style={{ fontFamily: 'SFProBold' }}>Total</small>
                      </ShippingInfo>
                      <ShippingInfo open={isOpen === id}>
                        <small>&nbsp;</small>
                        <small style={{ color: '#0CB68B' }}>
                          €&nbsp;{price}
                        </small>
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
                          €&nbsp;
                          {transaction.shipping}.00
                        </small>
                        <small style={{ fontFamily: 'SFProBold' }}>
                          €&nbsp;{transaction.total}
                        </small>
                      </ShippingInfo>
                    </div>
                  </div>
                  <ItemsList
                    length={!!transaction ? transaction.products.length : 8}
                    breakpoint={8}
                    style={{ backgroundColor: '#00000000', width: '100%' }}
                  >
                    {!!transaction &&
                      transaction.products.map((item, index) => (
                        <CheckoutItem
                          key={item.id}
                          item={item}
                          index={index}
                          isDesktop={false}
                        />
                      ))}
                  </ItemsList>
                </>
              )}
              <div
                style={{
                  height: 55,
                  margin: '17px auto 0',
                  width: '100%',
                }}
              >
                <ReOrderButton
                  color="#1DC167"
                  style={{ margin: '0 auto', width: '85%' }}
                  shadowColor="#17A75B"
                  onClick={handleReorder}
                >
                  Comprar novamente
                </ReOrderButton>
              </div>
              <div
                style={{
                  height: 55,
                  margin: '17px auto 0',
                  width: '100%',
                }}
              >
                <ReOrderButton
                  color="#F03F39"
                  style={{ margin: '0 auto', width: '85%' }}
                  shadowColor="#D02B21"
                  onClick={() => {}}
                >
                  Cancelar Encomenda
                </ReOrderButton>
              </div>
            </div>
          </>
        )}
      </Container>
      {toastVisible && (
        <Toast status={toastStatus} color={toastColor} isDesktop={false} />
      )}
    </>
  );
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
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
