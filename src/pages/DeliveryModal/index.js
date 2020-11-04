import React from 'react';
import PropTypes from 'prop-types';

import {
  Background,
  Container,
  Content,
  Header,
  PeriodDelivery,
  Title,
  Item,
  ItemsContainer,
} from './styles';

import delivery from '~/assets/envio-gratuito.svg';
import check from '~/assets/check.svg';
import close from '~/assets/close.svg';

export default function DeliveryModal({ closeModal }) {
  return (
    <Background>
      <Container>
        <Header>
          <button type="button" onClick={closeModal}>
            <img src={close} alt="Close panel" />
          </button>
        </Header>
        <Content>
          <PeriodDelivery>
            <img src={delivery} alt="" />
            <span>
              <p>Entrega</p>
              <p style={{ fontFamily: 'SFProBold', color: '#555555' }}>
                periódica
              </p>
            </span>
          </PeriodDelivery>
          <Title>
            Compre uma vez, <br /> <b>receba periodicamente em tua casa</b>
          </Title>
          <ItemsContainer
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 59,
            }}
          >
            <Item>
              <img src={check} alt="check icon" />
              <span>
                <strong>O melhor preço e os descontos mais vantajosos</strong>
                <p>Sempre Garantido!</p>
              </span>
            </Item>
            <Item>
              <img src={check} alt="check icon" />
              <span>
                <strong>Escolha a frequência de envio e os produtos</strong>
                <p>Modifique facilmente através do novo painel de controlo.</p>
              </span>
            </Item>
            <Item>
              <img src={check} alt="check icon" />
              <span>
                <strong>Cancelar, pausar ou modificar quando quiser</strong>
                <p>Sem contratos ou permanência.</p>
              </span>
            </Item>
            <Item>
              <img src={check} alt="check icon" />
              <span>
                <strong>Esqueça a fila e o carregamento de pacotes</strong>
                <p>
                  Nós cuidamos de tudo para que você não precise se preocupar
                  com nada.
                </p>
              </span>
            </Item>
          </ItemsContainer>
        </Content>
      </Container>
    </Background>
  );
}

DeliveryModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
