import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

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
import AddressesCarousel from '~/components/AddressesCarousel';

import backend from '~/services/api';
import {
  addAddressRequest,
  updateShippingInfoRequest,
} from '~/store/modules/addresses/actions';
import { nameIsValid, postcodeIsValid } from '~/utils/validation';

export default function MyAccount() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [country, setCountry] = useState('Portugal');

  const [zipcode, setZipcode] = useState('');

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
  const [addressEdit, setAddressEdit] = useState(null);

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
    window.scrollTo(0, 0);

    if (!!primaryAddress) {
      setSelected(primaryAddress.id);
    } else setSelected('');
  }, [primaryAddress]);

  const countryData = [{ label: 'Portugal', value: 'Portugal' }];

  const lookupAddress = useCallback(async () => {
    if (!postcodeIsValid(zipcode)) {
      return;
    }
    setLoading(true);

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
  }, [zipcode]);

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

      if (!!addressEdit) {
        dispatch(
          updateShippingInfoRequest({
            id: addressEdit.id,
            destination_name: newName,
            destination_last_name: newNickname,
            address,
            number,
            state,
            country,
            zipcode,
            district,
            city,
          })
        );
        setAddressEdit(null);
        return;
      }

      dispatch(
        addAddressRequest({
          destination_name: newName,
          destination_last_name: newNickname,
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
      setZipcode('');
    },
    [dispatch, zipcode, invalidFields, country, addressEdit]
  );

  useEffect(() => {
    if (!!addressEdit) formRef.current.setData(addressEdit);
  }, [addressEdit]);

  return (
    <>
      <Container isDesktop={isDesktop}>
        <Content isDesktop={isDesktop}>
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
            isDesktop={isDesktop}
          >
            <SectionTitle isDesktop={isDesktop}>
              <strong>Address</strong>
              <small>Check out and update your address.</small>
            </SectionTitle>
            <InputContainer
              isDesktop={isDesktop}
              style={isDesktop ? {} : { width: '100%', height: 53 }}
            >
              <Input
                name="destination_name"
                title="Recipient's Name"
                placeholder="Your name"
                customWidth={isDesktop ? 215 : '100%'}
                error={invalidFields[0]}
              />
            </InputContainer>
            <InputContainer
              isDesktop={isDesktop}
              style={
                isDesktop ? { width: 628 } : { width: '100%', height: 242 }
              }
            >
              <InputMask
                name="zipcode"
                title="Zipcode"
                placeholder="0000-000"
                mask="9999-999"
                value={zipcode}
                onChange={({ target: { value } }) => setZipcode(value)}
                customWidth={isDesktop ? 90 : '100%'}
                error={invalidFields[1]}
                onBlur={lookupAddress}
              />
              <Input
                name="address"
                title="Address"
                placeholder="Your address"
                customWidth={isDesktop ? 215 : '100%'}
                error={invalidFields[2]}
                disabled={addressInfo === {}}
                hasMarginLeft={isDesktop}
              />
              <Input
                name="number"
                title="Number"
                placeholder="Residence Nº"
                customWidth={isDesktop ? 90 : '100%'}
                error={invalidFields[3]}
                disabled={addressInfo === {}}
                hasMarginLeft={isDesktop}
              />
              <Input
                name="district"
                title="District"
                placeholder="Your district"
                customWidth={isDesktop ? 173 : '100%'}
                error={invalidFields[4]}
                disabled={addressInfo === {}}
                hasMarginLeft={isDesktop}
              />
            </InputContainer>
            <InputContainer
              isDesktop={isDesktop}
              style={
                isDesktop ? { width: 628 } : { width: '100%', height: 179 }
              }
            >
              <Input
                name="city"
                title="City"
                placeholder="Your city"
                customWidth={isDesktop ? 194 : '100%'}
                error={invalidFields[5]}
                disabled={addressInfo === {}}
              />
              <Input
                name="state"
                title="State"
                placeholder="Your state"
                error={invalidFields[6]}
                defaultValue="Lisboa"
                hasMarginLeft={isDesktop}
              />
              <Select
                title="Country"
                placeholder="Your country"
                setValue={setCountry}
                customWidth={isDesktop ? 173 : '100%'}
                defaultValue={{ label: 'Portugal', value: 'Portugal' }}
                data={countryData}
                hasMarginLeft={isDesktop}
              />
            </InputContainer>

            <Button
              color="#1DC167"
              disabled={loading}
              shadowColor="#17A75B"
              style={{ width: 221, marginTop: 40 }}
              type="submit"
            >
              <b>{!!addressEdit ? 'Save' : 'Add'}</b>
            </Button>
          </InfoContainer>
        </Content>

        {addresses.length !== 0 ? (
          <AddressesCarousel isDesktop={isDesktop}>
            {addresses.map((address, index) => (
              <Address
                address={address}
                selected={selected}
                setSelected={setSelected}
                setEdit={setAddressEdit}
                index={index}
              />
            ))}
          </AddressesCarousel>
        ) : (
          <h1>No addresses found.</h1>
        )}
      </Container>
      <div style={{ width: 840, height: 320 }} />
    </>
  );
}
