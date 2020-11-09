import React, { useState } from 'react';

import {
  Container,
  Content,
  InfoContainer,
  SectionTitle,
  Address,
  StartStop,
} from './styles';

import checked from '~/assets/checked.svg';

import { InputContainer, Button } from '~/components/LoginModal';

import Input from '~/components/Input';

import InputMask from '~/components/InputMask';
import Select from '~/components/Select';

export default function MyAccount() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');

  const [selected, setSelected] = useState('start');

  return (
    <>
      <Container>
        <Content>
          <InfoContainer onSubmit={() => {}}>
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
              />
            </InputContainer>
            <InputContainer style={{ width: 628 }}>
              <InputMask
                name="postcode"
                title="Código Postal"
                placeholder="0000-000"
                mask="9999-999"
                customWidth={90}
              />
              <Input
                name="residence"
                title="Morada"
                placeholder="Escreve a tua morada"
                customWidth={215}
                hasMarginLeft
              />
              <Input
                name="number"
                title="Número"
                placeholder="Nº da morada"
                customWidth={90}
                hasMarginLeft
              />
              <Input
                name="district"
                title="Distrito"
                placeholder="Escreve o teu distrito"
                customWidth={173}
                hasMarginLeft
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
                placeholder="Escolha a localidade"
                setValue={setPlace}
                hasMarginLeft
              />
              <Select
                title="País"
                placeholder="Escolha o país"
                setValue={setCountry}
                customWidth={173}
                hasMarginLeft
              />
            </InputContainer>

            <Button
              onClick={() => {}}
              color="#1DC167"
              shadowColor="#17A75B"
              style={{ width: 221, marginTop: 40 }}
            >
              <b>Adicionar</b>
            </Button>
          </InfoContainer>
        </Content>

        <div style={{ display: 'flex', marginTop: 40, height: 203 }}>
          <Address>
            <small>
              <b>Endereço de envio</b>
            </small>
            <small>Michel Oliveira</small>
            <small>Rua 7 de Junho</small>
            <small>23 RC 2740-164 Porto Salvo</small>
            <small>Portugal</small>
            <small>92 760 94 40</small>

            <StartStop selected={selected === 1} style={{ marginRight: 30 }}>
              <button type="button" onClick={() => setSelected(1)}>
                <img src={checked} alt="Item selecionado" />
              </button>
              <strong>Endereço Principal</strong>
            </StartStop>
          </Address>
          <Address>
            <small>
              <b>Endereço de envio</b>
            </small>
            <small>Isabella Oliveira</small>
            <small>Avenida Liberdade</small>
            <small>1500-000 Lisboa </small>
            <small>Portugal</small>
            <small>92 760 94 40</small>

            <StartStop selected={selected === 2} style={{ marginRight: 30 }}>
              <button type="button" onClick={() => setSelected(2)}>
                <img src={checked} alt="Item selecionado" />
              </button>
              <strong>Endereço Principal</strong>
            </StartStop>
          </Address>
        </div>
      </Container>
      <div style={{ width: 840, height: 320 }} />
    </>
  );
}
