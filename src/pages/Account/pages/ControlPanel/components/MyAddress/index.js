import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Content, InfoContainer, AddressInfo } from './styles';

import location from '~/assets/myAccount/location.svg';
import chevron from '~/assets/chevron-right.svg';

export default function MyAddress() {
  const history = useHistory();

  const primaryAddress = useSelector(state => state.addresses.primaryAddress);
  const addresses = useSelector(state => state.addresses.addresses);

  const addressInfo = useState(() => (!!primaryAddress ? primaryAddress : ''));
  const [addressMessage, setAddressMessage] = useState();

  const formatAddressMessage = useCallback(() => {
    if (addresses.length > 1)
      setAddressMessage(`${addresses.length} endereços guardados`);
    else setAddressMessage('Um endereço guardado');
  }, [addresses]);

  useEffect(() => {
    formatAddressMessage();
  }, [formatAddressMessage]);

  return (
    <Container onClick={() => history.push('/endereco')}>
      <InfoContainer>
        <img src={location} alt="Seus endereços" />
        <Content>
          <strong>Meu endereço</strong>
          <small>
            {addresses.length !== 0
              ? addressMessage
              : 'Nenhum endereço guardado'}
          </small>
        </Content>
        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      </InfoContainer>

      <AddressInfo>
        {addressInfo[0] !== '' ? (
          <>
            <small>ENDEREÇO PRINCIPAL</small>
            <strong>
              <b>{addressInfo[0].full_name}</b>
            </strong>
            <strong>
              {addressInfo[0].street_name}, {addressInfo[0].number}
            </strong>
            <strong>
              {addressInfo[0].cod_postal}, {addressInfo[0].distrito}
            </strong>
            <strong>Lisboa. Portugal</strong>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h3>
              Clique aqui para cadastrar <br />
              um endereço de entrega
            </h3>
          </div>
        )}
      </AddressInfo>
    </Container>
  );
}
