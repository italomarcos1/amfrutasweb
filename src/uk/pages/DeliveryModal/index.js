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
  InfoContainer,
} from './styles';

import delivery from '~/assets/entrega-periodica.svg';
import check from '~/assets/check.svg';
import close from '~/assets/close.svg';

import banner from '~/assets/banner-caixa@2x.png';

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
          <InfoContainer>
            <div>
              <PeriodDelivery>
                <img src={delivery} alt="" />
                <span>
                  <p>Periodic</p>
                  <p style={{ fontFamily: 'SFProBold', color: '#555555' }}>
                    Delivery
                  </p>
                </span>
              </PeriodDelivery>

              <Title>
                But once, <br /> <b>receive it recurrently at home.</b>
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
                    <strong>The best prices and the greatest discounts.</strong>
                    <p>Take it for granted!</p>
                  </span>
                </Item>
                <Item>
                  <img src={check} alt="check icon" />
                  <span>
                    <strong>Choose shipping frequency and products</strong>
                    <p>Easily modify via the new control panel. </p>
                  </span>
                </Item>
                <Item>
                  <img src={check} alt="check icon" />
                  <span>
                    <strong>Cancel, pause or modify at any time.</strong>
                    <p>No contracts.</p>
                  </span>
                </Item>
                <Item>
                  <img src={check} alt="check icon" />
                  <span>
                    <strong>Forget the queues and loading packages</strong>
                    <p>
                      We take care of everything so you don&apos;t worry about
                      nothing.
                    </p>
                  </span>
                </Item>
              </ItemsContainer>
            </div>
            <img src={banner} alt="Banner" style={{ height: 403.2 }} />
          </InfoContainer>
        </Content>
      </Container>
    </Background>
  );
}

DeliveryModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
