import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FaSpinner } from 'react-icons/fa';

import {
  addToCartRequest,
  removeFromFavoritesRequest,
} from '~/store/modules/cart/actions';

import backend from '~/services/api';

import Toast from '~/pt/components/Toast';

import delivery from '~/assets/myAccount/delivery_white.svg';
import orders from '~/assets/myAccount/orders_white.svg';
import close from '~/assets/icons/close.svg';

import {
  Container,
  ItemPicture,
  Title,
  ProductInfo,
  Options,
  PriceAndAmount,
  Button,
  DeleteItem,
} from './styles';

export default function Item({ item, index, isDesktop }) {
  const { id, thumbs, title, price, price_promotional, has_promotion } = item;
  const dispatch = useDispatch();

  const [loadingPeriodic, setLoadingPeriodic] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastStatus, setToastStatus] = useState('');
  const [toastColor, setToastColor] = useState('#1DC167');

  const products = useSelector(state => state.cart.products);

  const [qty, setQty] = useState(1);

  const productInCart = useCallback(() => {
    const findIndex = products.findIndex(p => p.id === id);

    if (findIndex >= 0) setQty(products[findIndex].qty);
    else setQty(-1);
  }, [id, products]);

  useEffect(() => {
    productInCart();
  }, [productInCart, id, products]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(item, 1));
  }, [item, dispatch]);

  const handleFavorite = () => {
    dispatch(removeFromFavoritesRequest(id));
  };

  const handlePeriodicDelivery = useCallback(async () => {
    try {
      setLoadingPeriodic(true);
      const finalProducts = [{ id, quantity: qty }];

      await backend.post('clients/scheduled-purchases/products', {
        products: finalProducts,
      });

      setToastStatus('O produto foi adicionado à compra periódica.');
      setToastColor('#1dc167');
      setToastVisible(true);
    } catch (err) {
      console.log(err.response);
      setToastStatus('Erro ao adicionar o produto à compra periódica.');
      setToastColor('#f56060');

      setToastVisible(true);
    } finally {
      setTimeout(() => {
        setToastVisible(false);
        setLoadingPeriodic(false);
      }, 2800);
    }
  }, [id, qty]);

  return (
    <Container
      key={id}
      index={index}
      style={index > 1 ? { marginTop: 20 } : {}}
      isDesktop={isDesktop}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={thumbs} isDesktop={isDesktop} />
        <ProductInfo>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Title isDesktop={isDesktop}>{title}</Title>
            <DeleteItem onClick={handleFavorite}>
              <img src={close} alt="Delete Item" />
            </DeleteItem>
          </div>
          <PriceAndAmount isDesktop={isDesktop}>
            {qty !== -1 ? <small>{qty} unidades</small> : <small>&nbsp;</small>}
            <strong>€&nbsp;{has_promotion ? price_promotional : price}</strong>
          </PriceAndAmount>
        </ProductInfo>
      </div>
      <Options isDesktop={isDesktop}>
        <Button
          color="#0cb68b"
          style={isDesktop ? { width: 185 } : { width: '51%', fontSize: 10 }}
          onClick={handlePeriodicDelivery}
          disabled={loadingPeriodic}
        >
          {loadingPeriodic ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <>
              <img src={delivery} alt="" />
              <small style={isDesktop ? {} : { fontSize: 10 }}>
                Adicionar a entrega periódica
              </small>
            </>
          )}
        </Button>
        <Button
          color="#29B4CC"
          onClick={handleAddToCart}
          style={isDesktop ? { width: 132 } : { width: '37%', fontSize: 10 }}
        >
          <img src={orders} alt="" style={{ width: 15, height: 15 }} />
          <small>Adicionar ao cesto</small>
        </Button>
      </Options>
      {toastVisible && (
        <Toast status={toastStatus} color={toastColor} isDesktop={false} />
      )}
    </Container>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    thumbs: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    price_promotional: PropTypes.string,
    has_promotion: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
