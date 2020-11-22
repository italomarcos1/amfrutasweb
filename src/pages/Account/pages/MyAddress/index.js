import React, { useCallback, useEffect, useState } from 'react';
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

import api from '~/services/api';
import { addAddress } from '~/store/modules/addresses/actions';
import { nameIsValid, postcodeIsValid } from '~/utils/validation';

export default function MyAccount() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');

  const [postcode, setPostcode] = useState('');
  const [tempPostcode, setTempPostcode] = useState('');

  const dispatch = useDispatch();

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

  const data = [{ label: 'Portugal', value: 'Portugal' }];

  const lookupAddress = useCallback(async () => {
    if (!postcodeIsValid(postcode) || tempPostcode === postcode) {
      return;
    }
    setLoading(true);

    setTempPostcode(postcode);
    const [cod, ext] = postcode.split('-');

    try {
      const {
        data: { address },
      } = await api.get(`/postcodes/${cod}-${ext}`);

      setAddressInfo(address[0]);
      setLoading(false);

      console.tron.log(address[0]);
    } catch (err) {
      setLoading(false);
      alert('Informe um código postal válido.');
    }
  }, [postcode, tempPostcode]);

  const addNewAddress = useCallback(
    formData => {
      const formattedData = Object.values(formData);
      console.tron.log(formattedData);
      invalidFields.fill(false);

      const anyEmptyField = formattedData.some(field => nameIsValid(field));

      if (anyEmptyField) {
        setInvalidFields(formattedData.map(field => nameIsValid(field)));
        return;
      }
      const {
        id,
        street_name,
        num_cod_postal,
        ext_cod_postal,
        nome_localidade,
        distrito,
      } = addressInfo;

      const { name, number } = formData;

      const [newName, ...restOfName] = name.split(' ');

      const newNickname = restOfName.join(' ');

      dispatch(
        addAddress({
          id,
          name: newName,
          nickname: newNickname,
          full_name: name,
          street_name,
          number,
          num_cod_postal,
          ext_cod_postal,
          cod_postal: `${num_cod_postal}-${ext_cod_postal}`,
          distrito,
          nome_localidade,
        })
      );
    },
    [addressInfo, dispatch, invalidFields]
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
          >
            <SectionTitle>
              <strong>Morada de entrega</strong>
              <small>Confira e atualize caso necessário.</small>
            </SectionTitle>
            <InputContainer>
              <Input
                name="name"
                title="Nome completo do destinatário"
                placeholder="Escreve o teu nome"
                customWidth={215}
                error={invalidFields[0]}
              />
            </InputContainer>
            <InputContainer style={{ width: 628 }}>
              <InputMask
                name="postcode"
                title="Código Postal"
                placeholder="0000-000"
                mask="9999-999"
                value={postcode}
                onChange={({ target: { value } }) => setPostcode(value)}
                customWidth={90}
                error={invalidFields[1]}
                onBlur={lookupAddress}
              />
              <Input
                name="street_name"
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
                name="distrito"
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
                name="nome_localidade"
                title="Cidade"
                placeholder="Escreve a tua cidade"
                customWidth={194}
                error={invalidFields[5]}
                disabled={addressInfo === {}}
              />
              <Input
                name="localidade"
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
                data={data}
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
