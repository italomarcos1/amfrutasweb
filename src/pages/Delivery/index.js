import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
} from './styles';

import { onlyValues } from '~/utils/onlyValues';

import { InputContainer, Button, SecureLogin } from '~/components/LoginModal';

import lock from '~/assets/lock.svg';
import facebook from '~/assets/facebook.svg';

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
  nameIsValid,
  dateIsValid,
  phoneIsValid,
  nifIsValid,
  mailCodeIsValid,
  mailIsValid,
} from '~/utils/validation';

export default function Delivery() {
  const [deliveryOption, setDeliveryOption] = useState('shop');
  const [deliveryDay, setDeliveryDay] = useState('');
  const [deliveryHour, setDeliveryHour] = useState('');
  const [residence, setResidence] = useState('');
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponIsValid, setCouponIsValid] = useState('');
  const [hoverCouponValid, setHoverCouponValid] = useState('');
  const [hoverButton, setHoverButton] = useState('none');

  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.products);

  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateCoupon = useCallback(() => {
    setCouponIsValid(!!coupon);
  }, [coupon]);

  const [email, setEmail] = useState(profile !== null ? profile.email : '');
  const [emailError, setEmailError] = useState(false);
  const [gender, setGender] = useState(profile !== null ? profile.gender : '');

  const [invalidFields, setInvalidFields] = useState([
    false,
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

  const handleSubmit = useCallback(
    formData => {
      const formattedData = Object.values(formData);
      invalidFields.fill(false);
      setInvalidNif(false);
      setInvalidPhone(false);
      setInvalidMailCode(false);
      setInvalidGender(false);
      setEmailError(false);
      setInvalidDateOfBirth(false);

      const anyEmptyField = formattedData.some(field => nameIsValid(field));

      if (anyEmptyField) {
        setInvalidFields(formattedData.map(field => nameIsValid(field)));
        setEmailError(!mailIsValid(formData.email));
        setInvalidNif(!nifIsValid(formData.nif));
        setInvalidPhone(!phoneIsValid(formData.phone));
        setInvalidMailCode(!mailCodeIsValid(formData.mailCode));
        setInvalidGender(nameIsValid(gender));
        setInvalidDateOfBirth(!dateIsValid(formData.dateOfBirth));

        return;
      }

      const profileData = {
        ...formData,
        gender,
      };

      dispatch(updateProfileRequest(profileData));
    },
    [dispatch, gender, invalidFields]
  );

  const genderData = [
    {
      label: 'Masculino',
      value: 'Masculino',
    },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
  ];

  if (cart.length === 0) {
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
                    />
                    <NoTitleSelect
                      setValue={setDeliveryHour}
                      customWidth={190}
                      placeholder="Hora"
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
              />
              <Input
                name="nickname"
                title="Apelido"
                placeholder="Escolhe o teu apelido"
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

              <InputMask name="dateOfBirth" title="Data de nascimento" />
            </InputContainer>
            <InputContainer>
              <InputMask name="nif" type="9d" title="NIF" />

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
            </InputContainer>
            <InputContainer>
              <InputMask name="phone" type="phone" title="Telemóvel" />
            </InputContainer>
          </InfoContainer>
          <InfoContainer onSubmit={() => {}} style={{ width: 683 }}>
            <SectionTitle>
              <strong>Morada de entrega</strong>
              <small>Confira e atualize caso necessário.</small>
            </SectionTitle>
            <InputContainer style={{ width: 628 }}>
              <Select
                title="Selecione a morada"
                placeholder="Escolha a morada"
                setValue={setResidence}
                customWidth={325}
              />
              <Input
                name="recipientName"
                title="Nome completo do destinatário"
                placeholder="Escreve o nome do destinatário"
                customWidth={283}
              />
            </InputContainer>
            <InputContainer style={{ width: 628 }}>
              <InputMask
                name="postCode"
                mask="9999-999"
                placeholder="0000-000"
                title="Código Postal"
                customWidth={90}
              />
              <Input
                name="residence"
                title="Morada"
                placeholder="Escreve a tua morada"
                customWidth={215}
              />
              <Input
                name="number"
                title="Número"
                placeholder="Escreve o teu número"
                customWidth={90}
              />
              <Input
                name="district"
                title="Distrito"
                placeholder="Escreve o teu distrito"
                customWidth={173}
              />
            </InputContainer>
            <InputContainer style={{ width: 628 }}>
              <Input
                name="city"
                title="Cidade"
                placeholder="Escreve a tua cidade"
                customWidth={194}
              />
              <Select
                title="Localidade"
                placeholder="Escolha a Localidade"
                setValue={setPlace}
                customWidth={221}
              />
              <Select
                title="Localidade"
                placeholder="Escolha o país"
                setValue={setCountry}
                customWidth={173}
              />
            </InputContainer>
          </InfoContainer>
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
              onClick={() => history.push('/confirmacao')}
              style={{ width: 309 }}
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
