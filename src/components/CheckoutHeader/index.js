import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
} from './styles';

import logo from '~/assets/amfrutas-white.svg';

export default function CheckoutHeader({ active }) {
  const userData = useSelector(state => state.user.info);
  const history = useHistory();

  return (
    <Header>
      <div className="content">
        <HeaderContent>
          <img src={logo} alt="Logo" style={{ width: 196, height: 43 }} />
          <SubHeader>
            <OptionContainer onClick={() => history.push('/cesto')}>
              <OptionTitle>Cesto</OptionTitle>
              <OptionBorder active>
                <OptionNumber active>1</OptionNumber>
              </OptionBorder>
            </OptionContainer>
            <OptionContainer
              disabled={active === 1}
              onClick={() => history.push('/entrega')}
            >
              <OptionTitle>Entrega</OptionTitle>
              <OptionBorder active={active === 2 || active === 3}>
                <OptionNumber
                  disabled={active === 3}
                  active={active === 2 || active === 3}
                >
                  2
                </OptionNumber>
              </OptionBorder>
            </OptionContainer>
            <OptionContainer
              disabled={!userData?.postCode}
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
            <MyOrdersButton to="/entrega">Meus Pedidos</MyOrdersButton>
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