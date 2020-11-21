import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container, StartStop, Options, TitleContainer } from './styles';

import checked from '~/assets/checked.svg';
import options from '~/assets/options.svg';

import {
  setPrimaryAddress,
  deleteAddress,
} from '~/store/modules/addresses/actions';

export default function Address({ address, selected, setEdit }) {
  const {
    id,
    name,
    street_name,
    number,
    num_cod_postal,
    ext_cod_postal,
    distrito,
  } = address;

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const handleSetPrimaryAddress = useCallback(() => {
    dispatch(setPrimaryAddress(id));
  }, [id, dispatch]);

  const handleDeleteAddress = useCallback(() => {
    dispatch(deleteAddress(id));
  }, [id, dispatch]);

  return (
    <Container>
      <TitleContainer>
        <small>
          <b>Endereço de envio</b>
        </small>
        <button type="button" onClick={() => setVisible(!visible)}>
          <img src={options} alt="" />
        </button>
      </TitleContainer>
      <small>{name}</small>
      <small>{street_name}</small>

      <small>{`${number} ${num_cod_postal}-${ext_cod_postal} ${distrito}`}</small>

      <small>Portugal</small>
      <small>92 760 94 40</small>

      <StartStop selected={selected === id} style={{ marginRight: 30 }}>
        <button type="button" onClick={handleSetPrimaryAddress}>
          <img src={checked} alt="Item selecionado" />
        </button>
        <strong>Endereço Principal</strong>
      </StartStop>
      <Options visible={visible}>
        <button
          type="button"
          className="edit"
          onClick={() => {
            setEdit(address);
            setVisible(false);
          }}
        >
          Editar
        </button>
        <button
          type="button"
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          className="delete"
          onClick={() => {
            handleDeleteAddress();
            setVisible(false);
          }}
        >
          Deletar
        </button>
      </Options>
    </Container>
  );
}

Address.propTypes = {
  address: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selected: PropTypes.bool.isRequired,
  setEdit: PropTypes.func.isRequired,
};
