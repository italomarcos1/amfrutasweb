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
} from './styles';

import { onlyValues } from '~/utils/onlyValues';

import api from '~/services/api';

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

import CheckoutHeader from '~/components/CheckoutHeader';
import Item from '~/components/CheckoutItem';

import { updateProfileRequest } from '~/store/modules/user/actions';
import {
  addAddress,
  setPrimaryAddress,
  updateShippingInfoRequest,
} from '~/store/modules/addresses/actions';

import { finishOrder } from '~/store/modules/cart/actions';

import { hours, returnNumberOfDays } from '~/utils/listMonths';

import {
  nameIsValid,
  dateIsValid,
  phoneIsValid,
  nifIsValid,
  mailCodeIsValid,
  mailIsValid,
  postcodeIsValid,
} from '~/utils/validation';

export default function Delivery() {
  const [deliveryOption, setDeliveryOption] = useState('shop');
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
  const shippingInfoRef = useRef();

  const cart = useSelector(state => state.cart.products);
  const hasOrder = useSelector(state => state.cart.hasOrder);

  const profile = useSelector(state => state.user.profile);
  const addresses = useSelector(state => state.addresses.addresses);
  const primaryAddress = useSelector(state => state.addresses.primaryAddress);

  const [formattedAddresses, setFormattedAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(() => {
    if (!!primaryAddress) {
      return primaryAddress;
    }
    return {};
  });

  const [postcode, setPostcode] = useState(() => {
    if (!!primaryAddress) {
      return primaryAddress.cod_postal;
    }
    return '';
  });

  const [tempPostcode, setTempPostcode] = useState(() => {
    if (!!primaryAddress) {
      return primaryAddress.cod_postal;
    }
    return '';
  });

  const [residence, setResidence] = useState(() => {
    if (!!primaryAddress) return primaryAddress.street_name; //eslint-disable-line
    return '';
  });

  const [hasLookup, setHasLookup] = useState(false);
  const [newAddressPrimary, setNewAddressPrimary] = useState(false);

  // os endereços são o objeto inteiro, com id e etc
  // o residence é só o label, pois o select mexe apenas com o label. se não, teríamos que mudar o Select ou criar um novo

  const formatAddresses = useCallback(() => {
    if (addresses.length === 0) return;

    const formattingAddresses = addresses.map(({ id, street_name }) => ({
      id,
      value: street_name,
      label: street_name,
    }));

    setFormattedAddresses(formattingAddresses);
  }, [addresses]);

  useEffect(() => {
    window.scrollTo(0, 0);
    formatAddresses();
  }, []);

  const validateCoupon = useCallback(() => {
    setCouponIsValid(!!coupon);
  }, [coupon]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState(profile !== null ? profile.email : '');
  const [emailError, setEmailError] = useState(false);
  const [gender, setGender] = useState(profile !== null ? profile.gender : '');

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

  const [invalidDateOfBirth, setInvalidDateOfBirth] = useState(false);

  const [invalidNif, setInvalidNif] = useState(false);
  const [invalidGender, setInvalidGender] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidMailCode, setInvalidMailCode] = useState(false);
  const [invalidResidence, setInvalidResidence] = useState(false);
  const [invalidPostcode, setInvalidPostcode] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);

  const [validUserInfo, setValidUserInfo] = useState(false);
  const [validShippingInfo, setValidShippingInfo] = useState(false);

  const validateData = useCallback((formData, invalidateFields) => {
    const formattedData = Object.values(formData);

    const anyEmptyField = formattedData.some(field => nameIsValid(field));

    if (anyEmptyField) {
      invalidateFields(formattedData.map(field => nameIsValid(field)));
    }

    return anyEmptyField;
  }, []);

  useEffect(() => {
    if (addresses.length === 0) return;
    const newAddress = addresses.findIndex(
      address => address.street_name === residence
    );

    if (newAddress < 0) return;

    setSelectedAddress(addresses[newAddress]);
    shippingInfoRef.current.setData(addresses[newAddress]);
  }, [residence, addresses]);

  const updatePrimaryAddress = useCallback(() => {
    dispatch(setPrimaryAddress(selectedAddress.id));
  }, [dispatch, selectedAddress]);

  const handleFinishOrder = useCallback(() => {
    dispatch(finishOrder());

    history.push('/confirmacao');
  }, [dispatch, history]);

  const lookupAddress = useCallback(async () => {
    if (!postcodeIsValid(postcode) || tempPostcode === postcode) {
      return;
    }
    setHasLookup(true);
    setLoading(true);

    setTempPostcode(postcode);
    const [cod, ext] = postcode.split('-');

    try {
      const {
        data: { address },
      } = await api.get(`/postcodes/${cod}-${ext}`);

      setLoading(false);

      setSelectedAddress({ ...address[0], cod_postal: postcode });
      shippingInfoRef.current.setData({ ...address[0], cod_postal: postcode });
    } catch (err) {
      setLoading(false);
      alert('Informe um código postal válido.');
    }
  }, [postcode, tempPostcode]);

  useEffect(() => {
    if (validUserInfo && validShippingInfo) handleFinishOrder();
  }, [validUserInfo, validShippingInfo, handleFinishOrder]);

  const handleSubmit = useCallback(
    formData => {
      invalidFields.fill(false);
      setInvalidNif(false);
      setInvalidPhone(false);
      setInvalidMailCode(false);
      setInvalidGender(false);
      setEmailError(false);
      setInvalidDateOfBirth(false);

      const anyEmptyField = validateData(formData, setInvalidFields);

      if (anyEmptyField) {
        setEmailError(!mailIsValid(formData.email));
        setInvalidNif(!nifIsValid(formData.nif));
        setInvalidPhone(!phoneIsValid(formData.phone));
        setInvalidMailCode(!mailCodeIsValid(formData.mailCode));
        setInvalidGender(nameIsValid(gender));
        setInvalidDateOfBirth(!dateIsValid(formData.dateOfBirth));
        window.scrollTo(0, 0);

        return;
      }

      const profileData = {
        ...formData,
        gender,
      };

      dispatch(updateProfileRequest(profileData));

      setValidUserInfo(true);
    },
    [dispatch, validateData, gender, invalidFields]
  );

  const handleShippingInfo = useCallback(
    formData => {
      // validar pra caso seja o input ou select
      locationInvalidFields.fill(false);
      setInvalidResidence(false);
      setInvalidPostcode(false);
      setInvalidLocation(false);

      delete formData.cod_postal;
      delete formData.residence;

      const anyEmptyField = validateData(formData, setLocationInvalidFields);

      if (anyEmptyField) {
        setInvalidResidence(nameIsValid(residence));
        setInvalidPostcode(!postcodeIsValid(postcode));
        setInvalidLocation(nameIsValid(country));
        window.scrollTo(0, 0);

        return;
      }

      if (!postcodeIsValid(postcode) || nameIsValid(residence)) {
        setInvalidPostcode(!postcodeIsValid(postcode));
        setInvalidResidence(nameIsValid(residence));
        window.scrollTo(0, 0);

        return;
      }

      const shippingData = {
        ...formData,
        id: selectedAddress.id,
        residence,
        country,
        postCode: postcode,
      };

      dispatch(updateShippingInfoRequest(shippingData));

      setValidShippingInfo(true);
    },
    [
      dispatch,
      residence,
      country,
      validateData,
      locationInvalidFields,
      postcode,
      selectedAddress,
    ]
  );

  const genderData = [
    {
      label: 'Masculino',
      value: 'Masculino',
    },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
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
                selected={deliveryOption === 'shop' || hoverButton === 'shop'}
                onClick={() => setDeliveryOption('shop')}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                onMouseOver={() => {
                  if (deliveryOption !== 'shop') setHoverButton('shop');
                }}
                onMouseLeave={() => {
                  if (deliveryOption !== 'shop') setHoverButton('none');
                }}
              >
                <DeliveryButtonContainer>
                  <DeliveryButtonContent
                    selected={
                      deliveryOption === 'shop' || hoverButton === 'shop'
                    }
                  >
                    <img
                      src={
                        deliveryOption === 'shop' || hoverButton === 'shop'
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
                  deliveryOption === 'customer' || hoverButton === 'customer'
                }
                onClick={() => setDeliveryOption('customer')}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onMouseOver={() => {
                  if (deliveryOption !== 'customer') setHoverButton('customer');
                }}
                onMouseLeave={() => {
                  if (deliveryOption !== 'customer') setHoverButton('none');
                }}
              >
                <DeliveryButtonContainer>
                  <DeliveryButtonContent
                    selected={
                      deliveryOption === 'customer' ||
                      hoverButton === 'customer'
                    }
                  >
                    <img
                      src={
                        deliveryOption === 'customer' ||
                        hoverButton === 'customer'
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
            {hoverButton === 'customer' || deliveryOption === 'customer' ? (
              <TakeOnShop>
                A retirada na loja deve ocorrer no endereço abaixo:
                <br />
                <b>Av. da República 1058 2775-271 Parede</b>
              </TakeOnShop>
            ) : (
              <DeliveryDateContainer>
                <div>
                  <strong style={{ width: 269 }}>
                    Selecione o melhor dia e horário para entrega
                  </strong>
                  <div>
                    <NoTitleSelect
                      setValue={setDeliveryDay}
                      customWidth={125}
                      placeholder="Dia"
                      data={returnNumberOfDays(new Date())}
                    />
                    <NoTitleSelect
                      setValue={setDeliveryHour}
                      customWidth={190}
                      placeholder="Hora"
                      data={hours}
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
            initialData={profile !== null ? profile : {}}
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
                name="nickname"
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
                name="dateOfBirth"
                title="Data de nascimento"
                error={invalidDateOfBirth}
              />
            </InputContainer>
            <InputContainer>
              <InputMask name="nif" type="9d" title="NIF" error={invalidNif} />

              {gender !== '' ? (
                <Select
                  title="Gênero"
                  placeholder="Escolha o gênero"
                  setValue={setGender}
                  defaultValue={{ label: gender, value: gender }}
                  customWidth={221}
                  data={genderData}
                  error={invalidGender}
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
            <InfoContainer
              onSubmit={handleShippingInfo}
              style={{ width: 683 }}
              initialData={selectedAddress}
              ref={shippingInfoRef}
            >
              <SectionTitle>
                <strong>Morada de entrega</strong>
                <small>Confira e atualize caso necessário.</small>
              </SectionTitle>
              <InputContainer style={{ width: 628 }}>
                {addresses.length === 0 || hasLookup ? (
                  <Input
                    name="residence"
                    title="Nome da morada (para futuras entregas)"
                    placeholder="Escreve o nome da morada"
                    customWidth={325}
                    value={residence}
                    onChange={({ target: { value } }) => setResidence(value)}
                    error={invalidResidence}
                  />
                ) : (
                  <Select
                    title="Selecione a morada"
                    placeholder="Escolha a morada"
                    setValue={setResidence}
                    defaultValue={{
                      value: `${selectedAddress.street_name}`,
                      label: `${selectedAddress.street_name}`,
                    }}
                    customWidth={325}
                    data={formattedAddresses}
                    error={invalidResidence}
                  />
                )}
                <Input
                  name="full_name"
                  title="Nome completo do destinatário"
                  placeholder="Escreve o nome do destinatário"
                  customWidth={283}
                  error={locationInvalidFields[0]}
                />
              </InputContainer>
              <InputContainer style={{ width: 628 }}>
                <InputMask
                  name="cod_postal"
                  mask="9999-999"
                  placeholder="0000-000"
                  title="Código Postal"
                  customWidth={90}
                  value={postcode}
                  onChange={({ target: { value } }) => setPostcode(value)}
                  error={invalidPostcode}
                  onBlur={lookupAddress}
                />
                <Input
                  name="street_name"
                  title="Morada"
                  placeholder="Escreve a tua morada"
                  customWidth={215}
                  error={locationInvalidFields[1]}
                />
                <Input
                  name="number"
                  title="Número"
                  placeholder="Escreve o teu número"
                  customWidth={90}
                  error={locationInvalidFields[2]}
                />
                <Input
                  name="distrito"
                  title="Distrito"
                  placeholder="Escreve o teu distrito"
                  customWidth={173}
                  error={locationInvalidFields[3]}
                />
              </InputContainer>
              <InputContainer style={{ width: 628 }}>
                <Input
                  name="nome_localidade"
                  title="Cidade"
                  placeholder="Escreve a tua cidade"
                  customWidth={194}
                  error={locationInvalidFields[4]}
                />
                <Input
                  name="localidade"
                  title="Localidade"
                  placeholder="Escolha a Localidade"
                  defaultValue="Lisboa"
                  customWidth={221}
                  error={locationInvalidFields[5]}
                />
                <Select
                  title="Localidade"
                  placeholder="Escolha o país"
                  setValue={setCountry}
                  defaultValue={{ value: 'Portugal', label: 'Portugal' }}
                  customWidth={173}
                  error={invalidLocation}
                />
              </InputContainer>
              <div
                style={{
                  // backgroundColor: '#f90',
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
                {addresses.length === 0 || hasLookup ? (
                  <StartStop selected={newAddressPrimary}>
                    <button
                      type="button"
                      onClick={() => setNewAddressPrimary(!newAddressPrimary)}
                    >
                      <img src={checked} alt="Item selecionado" />
                    </button>
                    <strong>Definir como endereço principal</strong>
                  </StartStop>
                ) : (
                  <StartStop
                    selected={
                      !!primaryAddress &&
                      selectedAddress.id === primaryAddress.id
                    }
                  >
                    <button type="button" onClick={updatePrimaryAddress}>
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
            <ul>
              {cart.map((item, index) => (
                <Item key={item.id} item={item} index={index} />
              ))}
            </ul>
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
              <h2>€ 179,14</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Economizou</h1>
              <h2>€ 22,09</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Crédito Disponível</h1>
              <h2 style={{ color: '#0CB68B' }}>€ 5,12</h2>
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
              <h2 style={{ color: '#0CB68B' }}>€ 10,00</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h1>Porte</h1>
              <h2 style={{ color: '#0CB68B' }}>Grátis</h2>
            </CheckoutItem>
            <CheckoutItem>
              <h2>Total</h2>
              <h2 style={{ fontSize: 25, color: '#0CB68B' }}>174,62</h2>
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
                shippingButtonRef.current.click();
              }}
              style={{ width: 309 }}
              disabled={loading}
            >
              <b>Concluir a Encomenda</b>
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
