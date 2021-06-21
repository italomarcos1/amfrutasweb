import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Container, Content, InfoContainer, AddressInfo } from './styles';

import location from '~/assets/myAccount/location.svg';
import chevron from '~/assets/chevron-right.svg';

export default function MyAddress() {
  const history = useHistory();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const primaryAddress = useSelector(state => state.addresses.primaryAddress);
  const addresses = useSelector(state => state.addresses.addresses);

  const addressInfo = useState(() => (!!primaryAddress ? primaryAddress : ''));
  const [addressMessage, setAddressMessage] = useState();

  const formatAddressMessage = useCallback(() => {
    if (addresses.length > 1)
      setAddressMessage(`${addresses.length} stored addresses.`);
    else setAddressMessage('One address stored.');
  }, [addresses]);

  useEffect(() => {
    formatAddressMessage();
  }, [formatAddressMessage]);

  return (
    <Container onClick={() => history.push('/endereco')} isDesktop={isDesktop}>
      <InfoContainer isDesktop={isDesktop}>
        <img
          src={location}
          alt="Seus endereços"
          style={isDesktop ? {} : { width: '15%', marginTop: 10 }}
        />
        <Content isDesktop={isDesktop}>
          <strong>My Address</strong>
          <small>
            {addresses.length !== 0 ? addressMessage : 'No addresses found'}
          </small>
        </Content>
        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      </InfoContainer>

      <AddressInfo isDesktop={isDesktop}>
        {addressInfo[0] !== '' ? (
          <>
            <small>MAIN ADDRESS</small>
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
              Click here to register <br />
              your shipping address
            </h3>
          </div>
        )}
      </AddressInfo>
    </Container>
  );
}
