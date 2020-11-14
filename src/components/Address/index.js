import React from 'react';
import PropTypes from 'prop-types';

import { Container, StartStop } from './styles';

import checked from '~/assets/checked.svg';

export default function Address({ address, selected, setSelected }) {
  const {
    id,
    name,
    street_name,
    number,
    num_cod_postal,
    ext_cod_postal,
    distrito,
  } = address;

  return (
    <Container>
      <small>
        <b>Endereço de envio</b>
      </small>
      <small>{name}</small>
      <small>{street_name}</small>

      <small>{`${number} ${num_cod_postal}-${ext_cod_postal} ${distrito}`}</small>

      <small>Portugal</small>
      <small>92 760 94 40</small>

      <StartStop selected={selected === id} style={{ marginRight: 30 }}>
        <button type="button" onClick={() => setSelected(id)}>
          <img src={checked} alt="Item selecionado" />
        </button>
        <strong>Endereço Principal</strong>
      </StartStop>
    </Container>
  );
}

Address.propTypes = {
  address: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
};
