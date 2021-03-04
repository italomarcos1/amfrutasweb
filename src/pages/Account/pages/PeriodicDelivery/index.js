import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, isAfter, parseISO } from 'date-fns';

import { FaSpinner } from 'react-icons/fa';

import {
  InfoContainer,
  Options,
  StartStop,
  CheckoutDetails,
  CheckoutItem,
  Title,
  StartDateInput,
} from './styles';

import { Button } from '~/components/LoginModal';

import Item from '~/components/PeriodicItem';
import ItemsList from '~/components/ItemsList';
import Toast from '~/components/Toast';
import EmptyCartContainer from '~/components/EmptyCartContainer';

import DeliveryContainer from './components/DeliveryContainer';

import checked from '~/assets/checked.svg';

import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';

import backend from '~/services/api';

import { periodicUpdating } from '~/store/modules/cart/actions';
import { periodicDateIsValid } from '~/utils/validation';

export default function PeriodicDelivery() {
  const [qty, setQty] = useState(4);
  const [updatingDelivery, setUpdatingDelivery] = useState(false);
  const [status, setStatus] = useState(1);
  const [cbackCredit, setCbackCredit] = useState('---');
  const [periodicProducts, setPeriodicProducts] = useState(null);
  const [saved, setSaved] = useState('---');
  const [subtotal, setSubtotal] = useState('---');
  const [total, setTotal] = useState('---');
  const [nextPurchase, setNextPurchase] = useState('00/00/0000');

  const [toastVisible, setToastVisible] = useState(false);
  const [toastStatus, setToastStatus] = useState('');
  const [toastColor, setToastColor] = useState('#1DC167');

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const dispatch = useDispatch();

  const removedProductId = useSelector(state => state.cart.productsUpdated);

  const handlePeriodicDelivery = useCallback(async () => {
    try {
      setUpdatingDelivery(true);

      if (!periodicDateIsValid(nextPurchase)) {
        setToastStatus('Forneça uma data válida para a compra periódica.');
        setToastColor('#f56060');

        setToastVisible(true);
        return;
      }

      const formattedDate = nextPurchase.split('/').reverse().join('-');
      const parsedFormattedDate = parseISO(formattedDate);
      const desiredDate = addDays(new Date(), 2);

      if (!isAfter(parsedFormattedDate, desiredDate)) {
        setToastStatus('Selecione uma data para ao menos daqui 3 dias.');
        setToastColor('#f56060');

        setToastVisible(true);
        return;
      }

      await backend.put(`/clients/scheduled-purchases`, {
        interval: qty,
        status,
        next_purchase: status === 1 ? nextPurchase : '01/01/2021',
      });

      setToastStatus('Sua compra periódica foi atualizada com sucesso.');
      setToastColor('#1dc167');
      setToastVisible(true);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setToastVisible(false);
      }, 2800);
      setUpdatingDelivery(false);
    }
  }, [qty, status, nextPurchase]);

  const loadPeriodicDeliveryProducts = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await backend.get('clients/scheduled-purchases');
      const { scheduled_products: products } = data;

      setPeriodicProducts(products);
      setStatus(data.status);
      setCbackCredit(data.cback_credit);
      setSaved(data.saved_value);
      setSubtotal(data.subtotal);
      setTotal(data.total);
      setNextPurchase(data.next_purchase.replaceAll('-', '/'));
    } catch (err) {
      setPeriodicProducts(null);
    }
  }, []);

  useEffect(() => {
    if (!removedProductId) return;
    // const productsAfterRemoval = periodicProducts.filter(
    //   ({ id }) => id !== removedProductId
    // );
    loadPeriodicDeliveryProducts();

    // setPeriodicProducts(productsAfterRemoval);

    dispatch(periodicUpdating(null));
  }, [dispatch, removedProductId, loadPeriodicDeliveryProducts]);

  useEffect(() => {
    loadPeriodicDeliveryProducts();
  }, [loadPeriodicDeliveryProducts]);

  return (
    <>
      <InfoContainer>
        <DeliveryContainer />
      </InfoContainer>
      <CheckoutDetails
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <div>
          <CheckoutItem
            style={{
              padding: '20px 0',
              paddingTop: 0,
              borderTop: 'none',
              height: 71,
              justifyContent: 'flex-start',
            }}
          >
            <h1>Receber a cada</h1>
            <Options>
              <button
                type="button"
                disabled={qty === 0}
                onClick={() => setQty(qty - 1)}
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <img src={minus} alt="icon" />
              </button>
              <strong>{qty}</strong>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <img src={plus} alt="icon" />
              </button>
            </Options>
            <h1>dias</h1>
          </CheckoutItem>
          <CheckoutItem
            style={{
              height: 71,

              justifyContent: 'flex-start',
            }}
          >
            <h1 style={{ marginRight: 30 }}>Início</h1>
            <StartDateInput
              mask="99/99/9999"
              placeholder="00/00/0000"
              value={nextPurchase}
              onChange={e => setNextPurchase(e.target.value)}
            />
          </CheckoutItem>
          <CheckoutItem
            style={{
              paddingTop: 20,
              justifyContent: 'flex-start',
            }}
          >
            <StartStop selected={status === 1} style={{ marginRight: 30 }}>
              <button type="button" onClick={() => setStatus(1)}>
                <img src={checked} alt="Item selecionado" />
              </button>
              <strong>Iniciar</strong>
            </StartStop>
            <StartStop selected={status === 0}>
              <button type="button" onClick={() => setStatus(0)}>
                <img src={checked} alt="Item selecionado" />
              </button>
              <strong>Parar</strong>
            </StartStop>
          </CheckoutItem>
          <Button
            color="#1DC167"
            shadowColor="#17A75B"
            onClick={handlePeriodicDelivery}
            style={
              isDesktop
                ? { marginTop: 10, width: 309, alignSelf: 'center' }
                : { marginTop: 10, width: '100%' }
            }
            disabled={
              updatingDelivery ||
              (!!periodicProducts && periodicProducts.length === 0)
            }
          >
            {updatingDelivery ? (
              <FaSpinner color="#fff" size={20} />
            ) : (
              <b>Atualizar Entrega Periódica</b>
            )}
          </Button>
        </div>
        <div style={{ marginLeft: 50, width: 400 }}>
          <Title>Resumo</Title>
          <CheckoutItem>
            <h1>Produtos</h1>
            <h2>€ {subtotal}</h2>
          </CheckoutItem>
          <CheckoutItem>
            <h1>Economizou</h1>
            <h2>€ {saved}</h2>
          </CheckoutItem>
          <CheckoutItem>
            <h1>Crédito Disponível</h1>
            <h2 style={{ color: '#0CB68B' }}>€ {cbackCredit}</h2>
          </CheckoutItem>
          <CheckoutItem>
            <h2>Total</h2>
            <h2 style={{ fontSize: 25, color: '#0CB68B' }}>{total}</h2>
          </CheckoutItem>
        </div>
      </CheckoutDetails>

      <ItemsList>
        {!!periodicProducts && periodicProducts.length !== 0 ? (
          periodicProducts.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              isDesktop={isDesktop}
            />
          ))
        ) : (
          <EmptyCartContainer
            message="Você não tem produtos de compra periódica."
            isDesktop={isDesktop}
          />
        )}
      </ItemsList>
      <div style={{ width: 840, height: 120 }} />
      {toastVisible && (
        <Toast status={toastStatus} color={toastColor} isDesktop={false} />
      )}
    </>
  );
}
