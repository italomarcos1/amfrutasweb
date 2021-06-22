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

// Novo
// Validado
// Em curso
// Completo
// Cancelado

export default function StatusContainer({ status }) {
  return (
    <Container status={status}>
      <BadgeContainer>
        <Badge active style={status === 'Cancelado' ? { paddingLeft: 5 } : {}}>
          <img src={status === 'Cancelado' ? cancelado : novo} alt="" />
        </Badge>
        <Separator
          active={
            status === 'Validado' ||
            status === 'Em curso' ||
            status === 'Completo'
          }
        />
        <Badge
          active={
            status === 'Validado' ||
            status === 'Em curso' ||
            status === 'Completo'
          }
        >
          <img
            src={
              status === 'Validado' ||
              status === 'Em curso' ||
              status === 'Completo'
                ? validadeOn
                : validadeOff
            }
            alt=""
          />
        </Badge>
        <Separator active={status === 'Em curso' || status === 'Completo'} />
        <Badge active={status === 'Completo'}>
          <img
            src={
              status === 'Em curso' || status === 'Completo'
                ? truckOn
                : truckOff
            }
            alt=""
          />
        </Badge>
        <Separator active={status === 'Completo'} />
        <Badge>
          <img src={status === 'Completo' ? completoOn : completoOff} alt="" />
        </Badge>
      </BadgeContainer>
      <BadgeTitleContainer>
        <BadgeTitle
          active={
            status === 'Novo' ||
            status === 'Validado' ||
            status === 'Em curso' ||
            status === 'Completo' ||
            status === 'Cancelado'
          }
          wasCancelled={status === 'Cancelado'}
          width={26}
          style={
            status === 'Cancelado' ? { marginLeft: -5 } : { marginLeft: 0 }
          }
        >
          {status === 'Cancelado' ? 'Cancelado' : 'Novo'}
        </BadgeTitle>
        <BadgeTitle
          active={
            status === 'Validado' ||
            status === 'Em curso' ||
            status === 'Completo'
          }
          style={
            status === 'Cancelado' ? { marginLeft: 114 } : { marginLeft: 107 }
          }
        >
          Validado
        </BadgeTitle>
        <BadgeTitle
          active={status === 'Em curso' || status === 'Completo'}
          width={106}
          style={{ marginLeft: 95 }}
        >
          Em curso
        </BadgeTitle>
        <BadgeTitle
          active={status === 'Completo'}
          width={48}
          style={{ marginLeft: 33 }}
        >
          Completo
        </BadgeTitle>
      </BadgeTitleContainer>
    </Container>
  );
}

StatusContainer.propTypes = {
  status: PropTypes.string.isRequired,
};
