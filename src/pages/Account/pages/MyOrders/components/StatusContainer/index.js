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
        <Badge active style={status === 'cancelled' ? { paddingLeft: 5 } : {}}>
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
        <BadgeTitle
          active={
            status === 'new' ||
            status === 'approved' ||
            status === 'onCourse' ||
            status === 'completed' ||
            status === 'cancelled'
          }
          wasCancelled={status === 'cancelled'}
          width={26}
          style={
            status === 'cancelled' ? { marginLeft: -5 } : { marginLeft: 0 }
          }
        >
          {status === 'cancelled' ? 'Cancelado' : 'Novo'}
        </BadgeTitle>
        <BadgeTitle
          active={
            status === 'approved' ||
            status === 'onCourse' ||
            status === 'completed'
          }
          style={
            status === 'cancelled' ? { marginLeft: 114 } : { marginLeft: 107 }
          }
        >
          Validado
        </BadgeTitle>
        <BadgeTitle
          active={status === 'onCourse' || status === 'completed'}
          width={106}
          style={{ marginLeft: 95 }}
        >
          Em curso
        </BadgeTitle>
        <BadgeTitle
          active={status === 'completed'}
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
