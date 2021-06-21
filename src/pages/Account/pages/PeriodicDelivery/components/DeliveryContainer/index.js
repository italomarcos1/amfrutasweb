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
          Periodic&nbsp;<b>Delivery</b>
        </strong>
        <small>
          Buy one time and receive <br />
          recurrently at yor home
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
            <b>No drawbacks.</b>&nbsp;Buy once and forget it!
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
            <b>The best promotions and discounts</b>&nbsp;applied.
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
            <b>Cancel, pause or edit</b>&nbsp;anytime you want.
          </span>
        </Item>
      </div>
    </Container>
  );
}
