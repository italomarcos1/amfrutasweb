import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Container, StartStop, Options, TitleContainer } from './styles';

import checked from '~/assets/checked.svg';
import options from '~/assets/options.svg';

import {
  setPrimaryAddress,
  deleteAddressRequest,
} from '~/store/modules/addresses/actions';

export default function Address({
  address: addressInfo,
  selected,
  setSelected,
  setEdit,
  index,
}) {
  const {
    id,
    destination_name,
    destination_last_name,
    address,
    number,
    zipcode,
    district,
  } = addressInfo;

  const profile = useSelector(state => state.user.profile);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const handleSetPrimaryAddress = useCallback(() => {
    dispatch(setPrimaryAddress(id));
  }, [id, dispatch]);

  const handleDeleteAddress = useCallback(() => {
    dispatch(deleteAddressRequest(id));
  }, [id, dispatch]);

  return (
    <Container index={index} isDesktop={isDesktop}>
      <TitleContainer>
        <small>
          <b>Endereço de envio</b>
        </small>
        <button type="button" onClick={() => setVisible(!visible)}>
          <img src={options} alt="" />
        </button>
      </TitleContainer>
      <small>
        {destination_name} {destination_last_name}
      </small>
      <small>{address}</small>

      <small>{`${number} ${zipcode} ${district}`}</small>

      <small>Portugal</small>
      <small>{!!profile ? profile.cellphone : '---'}</small>

      <StartStop selected={selected === id} style={{ marginRight: 30 }}>
        <button
          type="button"
          onClick={() => {
            handleSetPrimaryAddress();
            setSelected(id);
          }}
        >
          <img src={checked} alt="Item selecionado" />
        </button>
        <strong style={{ width: '70%' }}>Endereço Principal</strong>
      </StartStop>
      <Options visible={visible}>
        <button
          type="button"
          className="edit"
          onClick={() => {
            setEdit({
              ...addressInfo,
              destination_name: `${addressInfo.destination_name} ${addressInfo.destination_last_name}`,
            });
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
  index: PropTypes.number.isRequired,
};
