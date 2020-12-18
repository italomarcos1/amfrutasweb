import React from 'react';
import { useMediaQuery } from 'react-responsive';
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

// Available values ('canceled', 'validated', shipping', 'completed')

export default function StatusContainer({ status, id, disabled }) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <>
      <Container status={status} isDesktop={isDesktop}>
        <BadgeContainer>
          <Badge
            active
            style={status === 'Cancelado' ? { paddingLeft: 5 } : {}}
            disabled
          >
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
            disabled={disabled}
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
          <Badge disabled={disabled} active={status === 'Completo'}>
            <img
              src={
                status === 'Em curso' || status === 'Completo'
                  ? truckOn
                  : truckOff
              }
              alt=""
            />
          </Badge>
          <Separator active={status === 'Completo'} style={{ width: 26 }} />
          <Badge disabled={disabled}>
            <img
              src={status === 'Completo' ? completoOn : completoOff}
              alt=""
            />
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
              status === 'Cancelado' ? { marginLeft: 114 } : { marginLeft: 36 }
            }
            width={50}
          >
            Validado
          </BadgeTitle>
          <BadgeTitle
            active={status === 'Em curso' || status === 'Completo'}
            width={126}
            style={{ marginLeft: 29 }}
          >
            Em&nbsp;curso
          </BadgeTitle>
          <BadgeTitle
            active={status === 'Completo'}
            width={48}
            style={{ marginLeft: 14 }}
          >
            Completo
          </BadgeTitle>
        </BadgeTitleContainer>
      </Container>
    </>
  );
}

StatusContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
