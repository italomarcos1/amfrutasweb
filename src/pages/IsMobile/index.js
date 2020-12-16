import React from 'react';

import { Container, StoreButtonContainer, StoreButton } from './styles';

import logo from '~/assets/amfrutas-white.svg';
import appStore from '~/assets/appStore.svg';
import playStore from '~/assets/playStore.svg';

export default function IsMobile() {
  return (
    <Container>
      <img src={logo} alt="Logo" style={{ width: 196, height: 43 }} />
      <strong>Em atualizacão.</strong>
      <strong>Use nossos aplicativos.</strong>

      <StoreButtonContainer>
        <StoreButton
          href="https://apps.apple.com/pt/app/am-frutas/id1522622759"
          rel="noreferrer"
          target="_blank"
        >
          <img src={appStore} alt="" />
        </StoreButton>
        <StoreButton
          href="https://play.google.com/store/apps/details?id=com.amfrutas&amp;hl=en_US&amp;gl=US"
          rel="noreferrer"
          target="_blank"
        >
          <img src={playStore} alt="" />
        </StoreButton>
      </StoreButtonContainer>
    </Container>
  );
}
