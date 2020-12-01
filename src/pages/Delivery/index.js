import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import {
  Container,
  Content,
  CheckoutDetails,
  CheckoutItem,
  Title,
  ConfirmationText,
  ShippingWarning,
  DeliveryButton,
  DeliveryButtonContainer,
  DeliveryButtonContent,
  DeliveryOptionsContainer,
  DeliveryDateContainer,
  InfoContainer,
  SectionTitle,
  CouponInput,
  SendButton,
  CouponIsValid,
  TakeOnShop,
  StartStop,
  LoadingContainer,
  UseAddress,
} from './styles';

import { onlyValues } from '~/utils/onlyValues';
import { formatPrice } from '~/utils/calculatePrice';

import backend from '~/services/api';

import { InputContainer, Button, SecureLogin } from '~/components/LoginModal';

import lock from '~/assets/lock.svg';
import facebook from '~/assets/facebook.svg';
import checked from '~/assets/checked.svg';

import truckBlack from '~/assets/orders/truck-black.svg';
import truckWhite from '~/assets/orders/truck-white.svg';

import lojaBlack from '~/assets/orders/loja-black.svg';
import lojaWhite from '~/assets/orders/loja-white.svg';

import Footer from '~/components/Footer';
import TextArea from '~/components/TextArea';

import NoTitleSelect from '~/components/NoTitleSelect';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import Select from '~/components/Select';
import ItemsList from '~/components/ItemsList';

import CheckoutHeader from '~/components/CheckoutHeader';
import Item from '~/components/CheckoutItem';

import { addFinalProfileRequest } from '~/store/modules/user/actions';
import {
  addFinalAddressRequest,
  updateFinalShippingInfoRequest,
} from '~/store/modules/addresses/actions';

import { finishOrderRequest } from '~/store/modules/cart/actions';

import {
  nameIsValid,
  dateIsValid,
  phoneIsValid,
  documentIsValid,
  mailCodeIsValid,
  mailIsValid,
  postcodeIsValid,
} from '~/utils/validation';

import fakeAddress from '~/utils/fakeAddress';

export default function Delivery() {
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [deliveryDay, setDeliveryDay] = useState('');
  const [deliveryHour, setDeliveryHour] = useState('');
  const [country, setCountry] = useState('Portugal');
  const [coupon, setCoupon] = useState('');
  const [couponIsValid, setCouponIsValid] = useState('');
  const [hoverCouponValid, setHoverCouponValid] = useState('');
  const [hoverButton, setHoverButton] = useState('none');

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const accountButtonRef = useRef();
  const shippingButtonRef = useRef();
  const profileInfoRef = useRef();
  const shippingInfoRef = useRef();

  const cart = useSelector(state => state.cart.products);
  const hasOrder = useSelector(state => state.cart.hasOrder);
  const price = useSelector(state => state.cart.price);
  const saved = useSelector(state => state.cart.saved);
  const processingOrder = useSelector(state => state.cart.processingOrder);
  const orderFinished = useSelector(state => state.cart.orderFinished);

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [newAddress, setNewAddress] = useState(false);

  const profile = useSelector(state => state.user.profile);
  const finalProfile = useSelector(state => state.user.finalProfile);
  const finalAddress = useSelector(state => state.addresses.finalAddress);
  const addresses = useSelector(state => state.addresses.addresses);
  const [primaryAddress, setPrimaryAddress] = useState(profile.default_address);

  const [formattedAddresses, setFormattedAddresses] = useState(null);

  const [newPrimaryAddress, setNewPrimaryAddress] = useState(false);

  const [zipcode, setZipcode] = useState(() => {
    if (!!primaryAddress) {
      if (primaryAddress.length !== 0) {
        return primaryAddress.zipcode;
      }
    }
    return '';
  });

  const [tempZipcode, setTempZipcode] = useState(() => {
    if (!!primaryAddress) {
      if (primaryAddress.length !== 0) {
        return primaryAddress.zipcode;
      }
    }
    return '';
  });

  const [residence, setResidence] = useState(() => {
    if (!!primaryAddress) {
      if (primaryAddress.length !== 0) {
        return primaryAddress.address;
      }
    }
    return '';
  });

  const [hasLookup, setHasLookup] = useState(false);

  const [email, setEmail] = useState(!!profile ? profile.email : '');
  const [emailError, setEmailError] = useState(false);
  const [gender, setGender] = useState(!!profile ? profile.gender : 'male');

  const [invalidFields, setInvalidFields] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [locationInvalidFields, setLocationInvalidFields] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [invalidBirth, setInvalidBirth] = useState(false);

  const [invalidDocument, setInvalidDocument] = useState(false);
  const [invalidGender, setInvalidGender] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidMailCode, setInvalidMailCode] = useState(false);
  const [invalidResidence, setInvalidResidence] = useState(false);
  const [invalidPostcode, setInvalidPostcode] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);

  const [validUserInfo, setValidUserInfo] = useState(false);
  const [validShippingInfo, setValidShippingInfo] = useState(false);

  const [deliveryDays, setDeliveryDays] = useState([]);
  const [deliveryHours, setDeliveryHours] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [chosenShippingMethod, setChosenShippingMethod] = useState({
    id: 'delivery',
    cost: 4,
    label: 'Entrega em casa',
  });

  const [deliveryInterval, setDeliveryInterval] = useState(-1);

  const [invalidDeliveryDay, setInvalidDeliveryDay] = useState(false);
  const [invalidDeliveryHour, setInvalidDeliveryHour] = useState(false);

  // os endereços são o objeto inteiro, com id e etc
  // o residence é só o label, pois o select mexe apenas com o label. se não, teríamos que mudar o Select ou criar um novo

  const loadData = useCallback(async () => {
    const [delivery, shipping] = await Promise.all([
      backend.get('checkout/delivery-intervals'),
      backend.get('checkout/shipping-methods'),
    ]);

    const {
      data: { data: deliveryData },
    } = delivery;

    const {
      data: { data: shippingData },
    } = shipping;

    const formattingDeliveryDays = deliveryData.map(d => ({
      ...d,
      value: d.label,
    }));

    setDeliveryDays(formattingDeliveryDays);
    setShippingMethods(shippingData);
  }, []);

  useEffect(() => {
    const findIndex = deliveryDays.findIndex(d => d.label === deliveryDay);
    if (findIndex > -1) setDeliveryHours(deliveryDays[findIndex].intervals);
  }, [deliveryDays, deliveryDay]);

  const formatAddresses = useCallback(() => {
    if (addresses.length === 0) return;

    const formattingAddresses = addresses.map(({ id, address }) => ({
      id,
      value: address,
      label: address,
    }));

    setFormattedAddresses(formattingAddresses);
  }, [addresses]);

  useEffect(() => {
    window.scrollTo(0, 0);
    formatAddresses();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, []);

  const validateCoupon = useCallback(() => {
    setCouponIsValid(!!coupon);
  }, [coupon]);

  const validateData = useCallback((formData, invalidateFields) => {
    const formattedData = Object.values(formData);

    const anyEmptyField = formattedData.some(field => nameIsValid(field));

    if (anyEmptyField) {
      invalidateFields(formattedData.map(field => nameIsValid(field)));
    }

    return anyEmptyField;
  }, []);

  const populateAddress = useCallback(() => {
    const findNewAddress = addresses.findIndex(
      address => address.address === residence
    );

    if (findNewAddress < 0) return;

    const selectedAddress = addresses[findNewAddress];
    setZipcode(selectedAddress.zipcode);

    shippingInfoRef.current.setData({
      ...selectedAddress,
      destination_name: `${selectedAddress.destination_name} ${selectedAddress.destination_last_name}`,
    });
  }, [addresses, residence]);

  const populateDeliveryInterval = useCallback(() => {
    const findIndex = deliveryHours.findIndex(d => d.label === deliveryHour);
    if (findIndex < 0) {
      return;
    }

    setDeliveryInterval(deliveryHours[findIndex].id);
  }, [deliveryHour, deliveryHours]);

  useEffect(() => {
    if (deliveryHour === -1) return;
    populateDeliveryInterval();
  }, [deliveryHour, populateDeliveryInterval]);

  useEffect(() => {
    if (addresses.length === 0) return;
    populateAddress();
  }, [residence, addresses, populateAddress]);

  const modifyGender = useCallback(() => {
    return gender === 'Masculino'
      ? 'male'
      : gender === 'Feminino'
      ? 'female'
      : 'other';
  }, [gender]);

  const handleFinishOrder = useCallback(() => {
    if (!finalProfile || (deliveryOption === 'delivery' && !finalAddress)) {
      return;
    }

    const formattedDeliveryDay = deliveryDay.split('/').join('-');

    let formattedFinalAddress;

    if (deliveryOption === 'delivery') {
      formattedFinalAddress = {
        name: `${finalAddress.destination_name} ${finalAddress.destination_last_name}`,
        ...finalAddress,
      };
    }

    dispatch(
      finishOrderRequest({
        shipping_address:
          deliveryOption === 'delivery' ? formattedFinalAddress : fakeAddress,
        shippingMethod: chosenShippingMethod.id,
        deliveryDate: formattedDeliveryDay,
        deliveryInterval,
        products: cart,
      })
    );
    // os objetos usados para popular o form irão para cá, junto com os dados do carrinho
  }, [
    dispatch,
    cart,
    deliveryOption,
    finalAddress,
    finalProfile,
    chosenShippingMethod,
    deliveryDay,
    deliveryInterval,
  ]);

  const lookupAddress = useCallback(async () => {
    if (!postcodeIsValid(zipcode) || tempZipcode === zipcode) {
      return;
    }
    setHasLookup(true);
    setLoading(true);
    setResidence('');

    setTempZipcode(zipcode);
    const [cod, ext] = zipcode.split('-');

    try {
      const {
        data: { address },
      } = await backend.get(`/postcodes/${cod}-${ext}`);
      setLoading(false);

      shippingInfoRef.current.setData({
        ...address[0],
        zipcode: address[0].zipcode,
      });
    } catch (err) {
      setLoading(false);
      alert('Informe um código postal válido.');
    }
  }, [zipcode, tempZipcode]);

  useEffect(() => {
    if (deliveryOption === 'withdrawinstore' && validUserInfo) {
      handleFinishOrder();
      return;
    }
    if (validUserInfo && validShippingInfo) handleFinishOrder();
  }, [
    validUserInfo,
    validShippingInfo,
    handleFinishOrder,
    finalAddress,
    finalProfile,
    deliveryOption,
  ]);

  useEffect(() => {
    if (addresses.length === 0 || hasLookup) setNewAddress(true);
    else setNewAddress(false);
  }, [addresses, hasLookup]);

  useEffect(() => {
    if (hasLookup === false) return;
    if (newAddress === false) {
      setHasLookup(false);
      shippingInfoRef.current.setData({});
    }
  }, [newAddress, hasLookup]);

  const handleSubmit = useCallback(
    formData => {
      invalidFields.fill(false);
      setInvalidDocument(false);
      setInvalidPhone(false);
      setInvalidMailCode(false);
      setInvalidGender(false);
      setEmailError(false);
      setInvalidBirth(false);
      setInvalidDeliveryDay(false);
      setInvalidDeliveryHour(false);
      setValidUserInfo(false);

      const anyEmptyField = validateData(formData, setInvalidFields);

      if (anyEmptyField) {
        setEmailError(!mailIsValid(formData.email));
        setInvalidDocument(!documentIsValid(formData.document));
        setInvalidPhone(!phoneIsValid(formData.phone));
        setInvalidMailCode(!mailCodeIsValid(formData.verification_code));
        setInvalidGender(nameIsValid(gender));
        setInvalidBirth(!dateIsValid(formData.birth));
        window.scrollTo(0, 0);

        return;
      }

      if (
        deliveryOption === 'delivery' &&
        (nameIsValid(deliveryDay) || nameIsValid(deliveryHour))
      ) {
        setInvalidDeliveryDay(nameIsValid(deliveryDay));
        setInvalidDeliveryHour(nameIsValid(deliveryHour));

        window.scrollTo(0, 0);
        return;
      }

      const profileData = {
        ...formData,
        gender: modifyGender(),
      };

      dispatch(addFinalProfileRequest(profileData));

      setValidUserInfo(true);
    },
    [
      dispatch,
      validateData,
      gender,
      invalidFields,
      deliveryDay,
      deliveryHour,
      deliveryOption,
      modifyGender,
    ]
  );

  const handleShippingInfo = useCallback(
    formData => {
      // validar pra caso seja o input ou select
      locationInvalidFields.fill(false);
      setInvalidResidence(false);
      setInvalidPostcode(false);
      setInvalidLocation(false);
      setValidShippingInfo(false);

      delete formData.zipcode;
      delete formData.residence;

      const anyEmptyField = validateData(formData, setLocationInvalidFields);

      if (anyEmptyField) {
        setInvalidResidence(nameIsValid(residence));
        setInvalidPostcode(!postcodeIsValid(zipcode));
        setInvalidLocation(nameIsValid(country));
        window.scrollTo(0, 0);

        return;
      }

      if (!postcodeIsValid(zipcode) || nameIsValid(residence)) {
        setInvalidPostcode(!postcodeIsValid(zipcode));
        setInvalidResidence(nameIsValid(residence));
        window.scrollTo(0, 0);

        return;
      }

      if (
        deliveryOption === 'delivery' &&
        (nameIsValid(deliveryDay) || nameIsValid(deliveryHour))
      ) {
        setInvalidDeliveryDay(nameIsValid(deliveryDay));
        setInvalidDeliveryHour(nameIsValid(deliveryHour));

        window.scrollTo(0, 0);
        return;
      }

      const allDataShipping = shippingInfoRef.current.getData();
      const profileInfo = profileInfoRef.current.getData();

      const { destination_name } = allDataShipping;

      const [newName, ...restOfName] = destination_name.split(' ');

      const newNickname = restOfName.join(' ');

      const shippingData = {
        ...formData,
        destination_name: `${newName} ${newNickname}`,
        address: residence,
        country,
        zipcode,
      };

      if (newAddress) {
        dispatch(
          addFinalAddressRequest({
            address: { ...shippingData, default: newPrimaryAddress ? 1 : 0 },
            profile: {
              ...profileInfo,
              gender: modifyGender(),
            },
          })
        );
      } else {
        dispatch(
          updateFinalShippingInfoRequest({
            address: { ...shippingData, default: newPrimaryAddress ? 1 : 0 },
            profile: {
              ...profileInfo,
              gender: modifyGender(),
            },
          })
        );
      }

      setValidShippingInfo(true);
    },
    [
      dispatch,
      residence,
      country,
      validateData,
      locationInvalidFields,
      zipcode,
      newAddress,
      newPrimaryAddress,
      modifyGender,
      deliveryDay,
      deliveryHour,
      deliveryOption,
    ]
  );

  const handlePagination = useCallback(() => {
    const pageIndex = 8 * (currentPage - 1);
    const newPage = cart.slice(pageIndex, pageIndex + 8);

    setPaginatedProducts(newPage);
  }, [currentPage, cart]);

  useEffect(() => {
    handlePagination();
  }, [cart, handlePagination]);

  useEffect(() => {
    if (orderFinished) history.push('/confirmacao');
  }, [orderFinished, history]);

  useEffect(() => {
    // calcular subtotal
  }, [cart]);

  const genderData = [
    {
      label: 'Masculino',
      value: 'male',
    },
    { label: 'Feminino', value: 'female' },
    { label: 'Outro', value: 'other' },
  ];

  if (cart.length === 0 || !hasOrder) {
    return <Redirect to="/cesto" />;
  }

  return (
    <>
      <CheckoutHeader active={2} />
      <Container>
        <Content>
          <DeliveryOptionsContainer>
            <div style={{ width: 416, display: 'flex' }}>
              <DeliveryButton
                selected={
                  deliveryOption === 'delivery' || hoverButton === 'delivery'
                }
                onClick={() => {
                  setDeliveryOption('delivery');
                  if (shippingMethods.length !== 0)
                    setChosenShippingMethod(shippingMethods[0]);
                }}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                onMouseOver={() => {
                  if (deliveryOption !== 'delivery') setHoverButton('delivery');
                }}
                onMouseLeave={() => {
                  if (deliveryOption !== 'delivery') setHoverButton('none');
                }}
              >
                <DeliveryButtonContainer>
                  <DeliveryButtonContent
                    selected={
                      deliveryOption === 'delivery' ||
                      hoverButton === 'delivery'
                    }
                  >
                    <img
                      src={
                        deliveryOption === 'delivery' ||
                        hoverButton === 'delivery'
                          ? truckWhite
                          : truckBlack
                      }
                      alt="Entrega"
                      style={{ width: 36, height: 30 }}
                    />
                    Entrega Própria
                  </DeliveryButtonContent>
                  <div>Grátis</div>
                </DeliveryButtonContainer>
              </DeliveryButton>
              <DeliveryButton
                selected={
                  deliveryOption === 'withdrawinstore' ||
                  hoverButton === 'withdrawinstore'
                }
                onClick={() => {
                  setDeliveryOption('withdrawinstore');
                  if (shippingMethods.length !== 0)
                    setChosenShippingMethod(shippingMethods[1]);
                }}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onMouseOver={() => {
                  if (deliveryOption !== 'withdrawinstore')
                    setHoverButton('withdrawinstore');
                }}
                onMouseLeave={() => {
                  if (deliveryOption !== 'withdrawinstore')
                    setHoverButton('none');
                }}
              >
                <DeliveryButtonContainer>
                  <DeliveryButtonContent
                    selected={
                      deliveryOption === 'withdrawinstore' ||
                      hoverButton === 'withdrawinstore'
                    }
                  >
                    <img
                      src={
                        deliveryOption === 'withdrawinstore' ||
                        hoverButton === 'withdrawinstore'
                          ? lojaWhite
                          : lojaBlack
                      }
                      alt="Retirar na loja"
                      style={{ width: 28, height: 25 }}
                    />
                    Retirar
                    <br /> na Loja
                  </DeliveryButtonContent>
                  <div>Grátis</div>
                </DeliveryButtonContainer>
              </DeliveryButton>
            </div>
            {hoverButton === 'withdrawinstore' ||
            deliveryOption === 'withdrawinstore' ? (
              <TakeOnShop>
                A retirada na loja deve ocorrer no endereço abaixo:
                <br />
                <b>Av. da República 1058 2775-271 Parede</b>
              </TakeOnShop>
            ) : (
              <DeliveryDateContainer
                error={invalidDeliveryDay || invalidDeliveryHour}
              >
                <div>
                  <strong style={{ width: 269 }}>
                    Selecione o melhor dia e horário para entrega
                  </strong>
                  <div>
                    <NoTitleSelect
                      setValue={setDeliveryDay}
                      customWidth={125}
                      placeholder="Dia"
                      data={deliveryDays}
                    />
                    <NoTitleSelect
                      setValue={setDeliveryHour}
                      customWidth={190}
                      placeholder="Hora"
                      data={deliveryHours}
                    />
                  </div>
                </div>
              </DeliveryDateContainer>
            )}
            <ShippingWarning>
              Levantamento na loja:
              <b>Grátis</b>
              <br /> Compras até € 30,00:
              <b>Entrega € 5,00</b>
              <br /> Compras acima de € 30,00:
              <b>Entrega Grátis</b>
            </ShippingWarning>
          </DeliveryOptionsContainer>
        </Content>

        <Content style={{ marginTop: 40 }}>
          <InfoContainer
            onSubmit={handleSubmit}
            initialData={profile}
            ref={profileInfoRef}
          >
            <SectionTitle>
              <strong>Dados de contato</strong>
              <small>Confira e atualize caso necessário.</small>
            </SectionTitle>
            <InputContainer>
              <Input
                name="name"
                title="Nome"
                placeholder="Escreve o teu nome"
                error={invalidFields[0]}
              />
              <Input
                name="last_name"
                title="Apelido"
                placeholder="Escolhe o teu apelido"
                error={invalidFields[1]}
              />
            </InputContainer>
            <InputContainer>
              <Input
                name="email"
                title="Email"
                placeholder="Escreve o teu e-mail"
                setError={value => setEmailError(!mailIsValid(value))}
                value={email}
                onChange={({ target: { value } }) =>
                  onlyValues(value, setEmail)
                }
                error={emailError}
              />

              <InputMask
                name="birth"
                title="Data de nascimento"
                error={invalidBirth}
              />
            </InputContainer>
            <InputContainer>
              <InputMask
                name="document"
                type="9d"
                title="NIF"
                error={invalidDocument}
              />

              {gender !== '' ? (
                <Select
                  title="Gênero"
                  placeholder="Escolha o gênero"
                  setValue={setGender}
                  defaultValue={{ label: gender, value: gender }}
                  customWidth={221}
                  data={genderData}
                  error={invalidGender}
                  clearValue
                />
              ) : (
                <Select
                  title="Gênero"
                  placeholder="Escolha o gênero"
                  setValue={setGender}
                  customWidth={221}
                  data={genderData}
                  error={invalidGender}
                />
              )}
              <button
                type="submit"
                ref={accountButtonRef}
                style={{ display: 'none' }}
              >
                accountButton
              </button>
            </InputContainer>
            <InputContainer>
              <InputMask
                name="phone"
                type="phone"
                title="Telemóvel"
                error={invalidPhone}
              />
            </InputContainer>
          </InfoContainer>
          <div>
            {loading && (
              <LoadingContainer>
                <FaSpinner color="#666" size={42} />
              </LoadingContainer>
            )}
            {deliveryOption === 'withdrawinstore' && (
              <LoadingContainer>
                {/* <FaSpinner color="#666" size={42} /> */}
              </LoadingContainer>
            )}
            <InfoContainer
              onSubmit={handleShippingInfo}
              style={{ width: 683 }}
              initialData={
                !!primaryAddress
                  ? primaryAddress.length !== 0
                    ? {
                        ...primaryAddress,
                        destination_name: `${primaryAddress.destination_name} ${primaryAddress.destination_last_name}`,
                      }
                    : {}
                  : {}
              }
              ref={shippingInfoRef}
              loading={loading}
            >
              <SectionTitle>
                <strong>Morada de entrega</strong>
                <small>
                  {newAddress
                    ? 'Cadastre um novo endereço.'
                    : 'Confira e atualize caso necessário.'}
                </small>
              </SectionTitle>
              <InputContainer style={{ width: 628 }}>
                {newAddress ? (
                  <Input
                    name="residence"
                    title="Nome da morada (para futuras entregas)"
                    placeholder="Escreve o nome da morada"
                    customWidth={325}
                    value={residence}
                    onChange={({ target: { value } }) => setResidence(value)}
                    error={invalidResidence}
                    disabled={deliveryOption === 'withdrawinstore'}
                  />
                ) : (
                  <Select
                    title="Selecione a morada"
                    placeholder="Escolha a morada"
                    setValue={setResidence}
                    defaultValue={{
                      value: residence,
                      label: residence,
                    }}
                    customWidth={325}
                    data={formattedAddresses}
                    error={invalidResidence}
                    disabled={deliveryOption === 'withdrawinstore'}
                  />
                )}
                <Input
                  name="destination_name"
                  title="Nome completo do destinatário"
                  placeholder="Escreve o nome do destinatário"
                  customWidth={283}
                  error={locationInvalidFields[0]}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
              </InputContainer>
              <InputContainer style={{ width: 628 }}>
                <InputMask
                  name="zipcode"
                  mask="9999-999"
                  placeholder="0000-000"
                  title="Código Postal"
                  customWidth={90}
                  value={zipcode}
                  onChange={({ target: { value } }) => setZipcode(value)}
                  error={invalidPostcode}
                  onBlur={lookupAddress}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="address"
                  title="Morada"
                  placeholder="Escreve a tua morada"
                  customWidth={215}
                  error={locationInvalidFields[1]}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="number"
                  title="Número"
                  placeholder="Escreve o teu número"
                  customWidth={90}
                  error={locationInvalidFields[2]}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="district"
                  title="Distrito"
                  placeholder="Escreve o teu distrito"
                  customWidth={173}
                  error={locationInvalidFields[3]}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
              </InputContainer>
              <InputContainer style={{ width: 628 }}>
                <Input
                  name="city"
                  title="Cidade"
                  placeholder="Escreve a tua cidade"
                  customWidth={194}
                  error={locationInvalidFields[4]}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
                <Input
                  name="state"
                  title="Localidade"
                  placeholder="Escolha a Localidade"
                  defaultValue="Lisboa"
                  customWidth={221}
                  error={locationInvalidFields[5]}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
                <Select
                  title="Localidade"
                  placeholder="Escolha o país"
                  setValue={setCountry}
                  defaultValue={{ value: 'Portugal', label: 'Portugal' }}
                  customWidth={173}
                  error={invalidLocation}
                  disabled={deliveryOption === 'withdrawinstore'}
                />
              </InputContainer>
              <div
                style={{
                  marginTop: 40,
                }}
              >
                <button
                  type="submit"
                  ref={shippingButtonRef}
                  style={{ display: 'none' }}
                >
                  shippingButton
                </button>
                {newAddress ? (
                  <div style={{ display: 'flex' }}>
                    <StartStop selected={newPrimaryAddress}>
                      <button
                        type="button"
                        onClick={() => setNewPrimaryAddress(!newPrimaryAddress)}
                      >
                        <img src={checked} alt="Item selecionado" />
                      </button>
                      <strong>Definir como endereço principal</strong>
                    </StartStop>
                    {addresses.length !== 0 && (
                      <UseAddress onClick={() => setNewAddress(false)}>
                        <small>Usar um endereço já cadastrado</small>
                      </UseAddress>
                    )}
                  </div>
                ) : (
                  <StartStop selected={newPrimaryAddress}>
                    <button
                      type="button"
                      onClick={() => setNewPrimaryAddress(!newPrimaryAddress)}
                    >
                      <img src={checked} alt="Item selecionado" />
                    </button>
                    <strong>Definir como endereço principal</strong>
                  </StartStop>
                )}
              </div>
            </InfoContainer>
          </div>
        </Content>
        <Content
          style={{
            height: 55,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            marginTop: 40,
          }}
        >
          <Button
            color="#2CBDD3"
            shadowColor="#26A5BB"
            style={{ width: 197, marginTop: 0 }}
            onClick={() => history.push('/cesto')}
          >
            Editar&nbsp;<b>Produtos</b>
          </Button>
          <Title style={{ marginLeft: 685 }}>Resumo</Title>
        </Content>

        <Content style={{ marginTop: 20 }}>
          <div>
            <ItemsList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              {paginatedProducts.map((item, index) => (
                <Item key={item.id} item={item} index={index} />
              ))}
            </ItemsList>
            <TextArea
              title="Se não encontrou o que procura, digite abaixo que iremos verificar para si."
              name="notes"
              placeholder="Informe aqui"
              style={{ width: 840, height: 108 }}
              inputStyle={{ height: 87 }}
              error={false}
            />
          </div>
          <CheckoutDetails>
            <CheckoutItem>
              <h1>Produtos</h1>
              <h2>€&nbsp;{price}</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Economizou</h1>
              <h2>€&nbsp;{formatPrice(saved - price)}</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Crédito Disponível</h1>
              <h2 style={{ color: '#0CB68B' }}>
                €&nbsp;
                {!!profile
                  ? !!profile.cback_credit
                    ? profile.cback_credit
                    : '0.00'
                  : '0.00'}
              </h2>
            </CheckoutItem>
            <CheckoutItem style={{ height: 77 }}>
              <div style={{ display: 'flex' }}>
                {couponIsValid ? (
                  <CouponIsValid
                    onMouseOver={() => setHoverCouponValid(true)}
                    onMouseLeave={() => setHoverCouponValid(false)}
                    onClick={() => setCouponIsValid(false)}
                  >
                    {hoverCouponValid ? 'Remover Cupom' : 'Cupom Válido'}
                  </CouponIsValid>
                ) : (
                  <>
                    <CouponInput
                      placeholder="CUPOM"
                      value={coupon}
                      onChange={({ target: { value } }) => setCoupon(value)}
                    />
                    <SendButton onClick={validateCoupon}>Validar</SendButton>
                  </>
                )}
              </div>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Desconto do Cupom</h1>
              <h2 style={{ color: '#0CB68B' }}>€&nbsp;0,00</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Porte</h1>
              <h2 style={{ color: '#0CB68B' }}>
                €&nbsp;{chosenShippingMethod.cost},00
              </h2>
            </CheckoutItem>
            <CheckoutItem>
              <h2>Total</h2>
              <h2 style={{ fontSize: 25, color: '#0CB68B' }}>
                €&nbsp;
                {formatPrice(
                  Number(price) +
                    Number(chosenShippingMethod.cost) -
                    Number(
                      !!profile
                        ? !!profile.cback_credit
                          ? profile.cback_credit
                          : '0.00'
                        : '0.00'
                    )
                )}
              </h2>
            </CheckoutItem>
            <ConfirmationText>
              A confirmação da sua encomenda será feita <br />
              através de contacto telefónico pelos nossos <br />
              colaboradores no dia da entrega.
            </ConfirmationText>
            <Button
              color="#1DC167"
              shadowColor="#17A75B"
              onClick={() => {
                accountButtonRef.current.click();
                if (deliveryOption === 'delivery')
                  shippingButtonRef.current.click(); // aqui1
              }}
              style={{ width: 309 }}
              disabled={loading}
            >
              {processingOrder ? (
                <FaSpinner color="#fff" size={20} />
              ) : (
                <b>Concluir a Encomenda</b>
              )}
            </Button>
            <SecureLogin style={{ marginTop: 23.5 }}>
              Acesso <img src={lock} alt="Lock" /> Seguro
            </SecureLogin>
          </CheckoutDetails>
        </Content>
      </Container>
      <Footer />
    </>
  );
}
