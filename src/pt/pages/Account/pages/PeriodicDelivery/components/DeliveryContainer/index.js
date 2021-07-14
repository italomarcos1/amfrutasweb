import React from 'react';

import {
  Container,
  Item,
  InfoContainer,
  IconAndDataContainer,
  Content,
  UserInfoContainer,
  UserInfo,
} from './styles';

import delivery from '~/assets/myAccount/delivery.svg';
import check from '~/assets/check.svg';

export default function MyAccount() {
  return (
    <Container>
      <div>
        <img src={delivery} alt="Entrega" />
      </div>
      <div>
        <strong>
          Entrega&nbsp;<b>Periódica</b>
        </strong>
        <small>
          Compre uma vez e receba <br />
          periodicamente em tua casa
        </small>
      </div>
      <div
        style={{
          height: 76,
          marginLeft: 33,
          paddingLeft: 0,
          marginTop: 16,
        }}
      >
        <Item
          style={{
            paddingLeft: 0,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <img src={check} alt="check icon" style={{ marginRight: 12.5 }} />
          <span>
            <b>Máximo conforto.</b>&nbsp;Compre uma vez e esqueça!
          </span>
        </Item>
        <Item
          style={{
            paddingLeft: 0,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <img src={check} alt="check icon" style={{ marginRight: 12.5 }} />
          <span>
            <b>Os descontos e promoções mais vantajosos</b>&nbsp;sempre
            aplicados.
          </span>
        </Item>
        <Item
          style={{
            paddingLeft: 0,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <img src={check} alt="check icon" style={{ marginRight: 12.5 }} />
          <span>
            <b>Cancelar, pausar ou editar</b>&nbsp;sempre que quiser.
          </span>
        </Item>
      </div>
    </Container>
  );
}
