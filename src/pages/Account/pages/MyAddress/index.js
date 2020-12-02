import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import {
  Container,
  Content,
  InfoContainer,
  SectionTitle,
  LoadingContainer,
} from './styles';

import { InputContainer, Button } from '~/components/LoginModal';

import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import Select from '~/components/Select';
import Address from '~/components/Address';

import backend from '~/services/api';
import { addAddressRequest } from '~/store/modules/addresses/actions';
import { nameIsValid, postcodeIsValid } from '~/utils/validation';

export default function MyAccount() {
  const [country, setCountry] = useState('Portugal');

  const [zipcode, setZipcode] = useState('');
  const [tempZipcode, setTempZipcode] = useState('');

  const dispatch = useDispatch();

  const formRef = useRef();

  const addresses = useSelector(state => state.addresses.addresses);
  const primaryAddress = useSelector(state => state.addresses.primaryAddress);

  const [selected, setSelected] = useState(() => {
    if (!!primaryAddress) return primaryAddress.id; //eslint-disable-line
    return '';
  });

  const [loading, setLoading] = useState(false);

  const [addressInfo, setAddressInfo] = useState({});

  const [invalidFields, setInvalidFields] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (!!primaryAddress) {
      setSelected(primaryAddress.id);
    } else setSelected('');
  }, [primaryAddress]);

  const countryData = [{ label: 'Portugal', value: 'Portugal' }];

  const lookupAddress = useCallback(async () => {
    if (!postcodeIsValid(zipcode) || tempZipcode === zipcode) {
      return;
    }
    setLoading(true);

    setTempZipcode(zipcode);
    const [cod, ext] = zipcode.split('-');

    try {
      const {
        data: { data },
      } = await backend.get(`/postcodes/${cod}-${ext}`);

      const {
        num_cod_postal,
        ext_cod_postal,
        address,
        number,
        city,
        district,
      } = data;

      const formattedInfo = {
        zipcode: `${num_cod_postal}-${ext_cod_postal}`,
        address,
        number,
        city,
        district,
      };

      setAddressInfo(formattedInfo);

      formRef.current.setData(formattedInfo);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Informe um código postal válido.');
    }
  }, [zipcode, tempZipcode]);

  const addNewAddress = useCallback(
    formData => {
      const formattedData = Object.values(formData);
      invalidFields.fill(false);

      const anyEmptyField = formattedData.some(field => nameIsValid(field));

      if (anyEmptyField) {
        setInvalidFields(formattedData.map(field => nameIsValid(field)));
        return;
      }

      const {
        destination_name,
        number,
        address,
        city,
        district,
        state,
      } = formRef.current.getData();

      const [newName, ...restOfName] = destination_name.split(' ');

      const newNickname = restOfName.join(' ');

      dispatch(
        addAddressRequest({
          destination_name: newName + newNickname,
          address,
          number,
          state,
          country,
          zipcode,
          district,
          city,
        })
      );

      formRef.current.reset();
    },
    [dispatch, zipcode, invalidFields, country]
  );

  return (
    <>
      <Container>
        <Content>
          {loading && (
            <LoadingContainer>
              <FaSpinner color="#666" size={42} />
            </LoadingContainer>
          )}
          <InfoContainer
            onSubmit={addNewAddress}
            initialData={addressInfo}
            loading={loading}
            ref={formRef}
          >
            <SectionTitle>
              <strong>Morada de entrega</strong>
              <small>Confira e atualize caso necessário.</small>
            </SectionTitle>
            <InputContainer>
              <Input
                name="destination_name"
                title="Nome completo do destinatário"
                placeholder="Escreve o teu nome"
                customWidth={215}
                error={invalidFields[0]}
              />
            </InputContainer>
            <InputContainer style={{ width: 628 }}>
              <InputMask
                name="zipcode"
                title="Código Postal"
                placeholder="0000-000"
                mask="9999-999"
                value={zipcode}
                onChange={({ target: { value } }) => setZipcode(value)}
                customWidth={90}
                error={invalidFields[1]}
                onBlur={lookupAddress}
              />
              <Input
                name="address"
                title="Morada"
                placeholder="Morada"
                customWidth={215}
                error={invalidFields[2]}
                disabled={addressInfo === {}}
                hasMarginLeft
              />
              <Input
                name="number"
                title="Número"
                placeholder="Nº da morada"
                customWidth={90}
                error={invalidFields[3]}
                disabled={addressInfo === {}}
                hasMarginLeft
              />
              <Input
                name="district"
                title="Distrito"
                placeholder="Escreve o teu distrito"
                customWidth={173}
                error={invalidFields[4]}
                disabled={addressInfo === {}}
                hasMarginLeft
              />
            </InputContainer>
            <InputContainer style={{ width: 628 }}>
              <Input
                name="city"
                title="Cidade"
                placeholder="Escreve a tua cidade"
                customWidth={194}
                error={invalidFields[5]}
                disabled={addressInfo === {}}
              />
              <Input
                name="state"
                title="Localidade"
                placeholder="Escolha a localidade"
                error={invalidFields[6]}
                defaultValue="Lisboa"
                hasMarginLeft
              />
              <Select
                title="País"
                placeholder="Escolha o país"
                setValue={setCountry}
                customWidth={173}
                defaultValue={{ label: 'Portugal', value: 'Portugal' }}
                data={countryData}
                hasMarginLeft
              />
            </InputContainer>

            <Button
              color="#1DC167"
              disabled={loading}
              shadowColor="#17A75B"
              style={{ width: 221, marginTop: 40 }}
              type="submit"
            >
              <b>Adicionar</b>
            </Button>
          </InfoContainer>
        </Content>

        <div style={{ display: 'flex', marginTop: 40, height: 203 }}>
          {addresses.length !== 0 ? (
            addresses.map(address => (
              <Address
                address={address}
                selected={selected}
                setSelected={setSelected}
                setEdit={setAddressInfo}
              />
            ))
          ) : (
            <h1>Você ainda não tem nenhum endereço adicionado.</h1>
          )}
        </div>
      </Container>
      <div style={{ width: 840, height: 320 }} />
    </>
  );
}
