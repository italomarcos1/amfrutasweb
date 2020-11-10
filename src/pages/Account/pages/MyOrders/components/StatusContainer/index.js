import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  BadgeContainer,
  Separator,
  Badge,
  BadgeTitle,
  BadgeTitleContainer,
} from './styles';

import novo from '~/assets/orders/novo.svg';
import cancelado from '~/assets/orders/cancelado.svg';

import truckOff from '~/assets/orders/truck-off.svg';
import truckOn from '~/assets/orders/truck-on.svg';

import completoOff from '~/assets/orders/completo-off.svg';
import completoOn from '~/assets/orders/completo-on.svg';

import validadeOff from '~/assets/orders/validade-off.svg';
import validadeOn from '~/assets/orders/validado-on.svg';

// new
// approved
// onCourse
// completed
// cancelled

export default function StatusContainer({ status }) {
  return (
    <Container status={status}>
      <BadgeContainer>
        <Badge active>
          <img src={status === 'cancelled' ? cancelado : novo} alt="" />
        </Badge>
        <Separator
          active={
            status === 'approved' ||
            status === 'onCourse' ||
            status === 'completed'
          }
        />
        <Badge
          active={
            status === 'approved' ||
            status === 'onCourse' ||
            status === 'completed'
          }
        >
          <img
            src={
              status === 'approved' ||
              status === 'onCourse' ||
              status === 'completed'
                ? validadeOn
                : validadeOff
            }
            alt=""
          />
        </Badge>
        <Separator active={status === 'onCourse' || status === 'completed'} />
        <Badge active={status === 'completed'}>
          <img
            src={
              status === 'onCourse' || status === 'completed'
                ? truckOn
                : truckOff
            }
            alt=""
          />
        </Badge>
        <Separator active={status === 'completed'} />
        <Badge>
          <img src={status === 'completed' ? completoOn : completoOff} alt="" />
        </Badge>
      </BadgeContainer>
      <BadgeTitleContainer>
        <BadgeTitle style={{ marginLeft: 0 }}>
          {status === 'cancelled' ? 'Cancelado' : 'Novo'}
        </BadgeTitle>
        <BadgeTitle>Validado</BadgeTitle>
        <BadgeTitle>Em curso</BadgeTitle>
        <BadgeTitle>Completo</BadgeTitle>
      </BadgeTitleContainer>
    </Container>
  );
}

StatusContainer.propTypes = {
  status: PropTypes.string.isRequired,
};
