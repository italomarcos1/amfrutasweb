import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Content,
  CheckoutDetails,
  CheckoutItem,
  Title,
  ConfirmationText,
  ShippingWarning,
  DeliveryButton,
  DeliveryButtonContent,
  DeliveryOptionsContainer,
  DeliveryDateContainer,
  InfoContainer,
  SectionTitle,
  CouponInput,
  SendButton,
  CouponIsValid,
} from './styles';

import { InputContainer, Button, SecureLogin } from '~/components/LoginModal';

import lock from '~/assets/lock.svg';
import facebook from '~/assets/facebook.svg';

import Footer from '~/components/Footer';
import TextArea from '~/components/TextArea';

import NoTitleSelect from '~/components/NoTitleSelect';
import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import Select from '~/components/Select';

import CheckoutHeader from '~/components/CheckoutHeader';
import Item from '~/components/CheckoutItem';

import agua1l from '~/assets/products/agua1l@2x.png';

export default function Delivery() {
  const items = [
    {
      id: 1,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
    {
      id: 2,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
    {
      id: 3,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
    {
      id: 4,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
    {
      id: 5,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
    {
      id: 6,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
    {
      id: 7,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
    {
      id: 8,
      picture: agua1l,
      title:
        'Água com Gás Mineral Natural Gaseificada 25 cl Castello PH de 20º',
      oldPrice: '10.99',
      newPrice: '9.80',
      amount: 0,
    },
  ];
  const [deliveryOption, setDeliveryOption] = useState('shop');
  const [deliveryDay, setDeliveryDay] = useState('');
  const [deliveryHour, setDeliveryHour] = useState('');
  const [gender, setGender] = useState('');
  const [residence, setResidence] = useState('');
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponIsValid, setCouponIsValid] = useState('');
  const [hoverCouponValid, setHoverCouponValid] = useState('');

  const history = useHistory();

  const validateCoupon = useCallback(() => {
    setCouponIsValid(!!coupon);
  }, [coupon]);

  return (
    <>
      <CheckoutHeader active={2} />
      <Container>
        <Content>
          <DeliveryOptionsContainer>
            <div style={{ width: 416, display: 'flex' }}>
              <DeliveryButton
                selected={deliveryOption === 'shop'}
                onClick={() => setDeliveryOption('shop')}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              >
                <DeliveryButtonContent>
                  <span>
                    <img src={facebook} alt="Envio" />
                    Entrega Própria
                  </span>
                  <div>Grátis</div>
                </DeliveryButtonContent>
              </DeliveryButton>
              <DeliveryButton
                selected={deliveryOption === 'customer'}
                onClick={() => setDeliveryOption('customer')}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <DeliveryButtonContent>
                  <span>
                    <img src={facebook} alt="Envio" />
                    Entrega Própria
                  </span>
                  <div>Grátis</div>
                </DeliveryButtonContent>
              </DeliveryButton>
            </div>
            <DeliveryDateContainer>
              <div>
                <strong>Selecione o melhor dia e horário para entrega</strong>
                <div>
                  <NoTitleSelect setValue={setDeliveryDay} customWidth={125} />
                  <NoTitleSelect setValue={setDeliveryHour} customWidth={190} />
                </div>
              </div>
            </DeliveryDateContainer>
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
          <InfoContainer onSubmit={() => {}}>
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
                title="E-mail"
                placeholder="Escreve o teu e-mail"
              />

              <InputMask name="dateOfBirth" title="Data de nascimento" />
            </InputContainer>
            <InputContainer>
              <InputMask name="nif" mask="9d" title="NIF" />
              <Select
                title="Gênero"
                placeholder="Escolha o gênero"
                setValue={setGender}
                customWidth={221}
              />
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
              {items.map(item => (
                <Item key={item.id} item={item} />
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
