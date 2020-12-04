import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  SubHeader,
  Line,
  OptionContainer,
  OptionTitle,
  OptionNumber,
  OptionBorder,
  Header,
  HeaderContent,
  BackButton,
  MyOrdersButton,
  Logo,
} from './styles';

import { knightFall } from '~/store/modules/user/actions';

import logo from '~/assets/amfrutas-white.svg';

export default function CheckoutHeader({ active }) {
  const cart = useSelector(state => state.cart.products);
  const history = useHistory();
  const dispatch = useDispatch();

  const [
    shouldNotAccessConfirmation,
    setShouldNotAccessConfirmation,
  ] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/cesto' || pathname === '/entrega') {
      setShouldNotAccessConfirmation(true);
    }
  }, [pathname]);

  return (
    <Header>
      <div className="content">
        <HeaderContent>
          <Logo to="/">
            <img src={logo} alt="Logo" style={{ width: 196, height: 43 }} />
          </Logo>
          <SubHeader>
            <OptionContainer onClick={() => history.push('/cesto')}>
              <OptionTitle>Cesto</OptionTitle>
              <OptionBorder active>
                <OptionNumber active>1</OptionNumber>
              </OptionBorder>
            </OptionContainer>
            <OptionContainer
              disabled={active === 1 || active === 3}
              onClick={() => history.push('/entrega')}
            >
              <OptionTitle>Entrega</OptionTitle>
              <OptionBorder active={active === 2 || active === 3}>
                <OptionNumber
                  disabled={active === 3 || cart.length === 0}
                  active={active === 2 || active === 3}
                >
                  2
                </OptionNumber>
              </OptionBorder>
            </OptionContainer>
            <OptionContainer
              disabled={shouldNotAccessConfirmation}
              onClick={() => history.push('/confirmacao')}
            >
              <OptionTitle>Confirmação</OptionTitle>
              <OptionBorder active={active === 3}>
                <OptionNumber active={active === 3}>3</OptionNumber>
              </OptionBorder>
            </OptionContainer>
            <Line />
          </SubHeader>
          {active === 3 ? (
            <MyOrdersButton
              onClick={() => {
                dispatch(knightFall());
                history.push('/encomendas');
              }}
            >
              Minhas Encomendas
            </MyOrdersButton>
          ) : (
            <BackButton to={active === 2 ? 'cesto' : '/'}>Voltar</BackButton>
          )}
        </HeaderContent>
      </div>
    </Header>
  );
}

CheckoutHeader.propTypes = {
  active: PropTypes.number,
};

CheckoutHeader.defaultProps = {
  active: 1,
};
