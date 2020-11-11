import React from 'react';

import {
  TopFooter,
  BottomFooter,
  BottomFooterContent,
  ItemsContainer,
  Item,
} from './styles';
import logo from '~/assets/amfrutas-bottom.svg';

import facebook from '~/assets/facebook.svg';
import instagram from '~/assets/instagram.svg';
import youtube from '~/assets/youtube.svg';
import google from '~/assets/google.svg';

export default function Footer() {
  return (
    <>
      <TopFooter>
        <img src={logo} alt="" style={{ width: 233, height: 52 }} />
        <ItemsContainer>
          <Item>
            <span>
              <p>Central de Atendimento</p>
              <p>Trocas e Devoluções</p>
              <p>Condições de Pagamento</p>
            </span>
          </Item>
          <Item>
            <span>
              <p>Termos e Condições</p>
              <p>Cookies e Privacidade</p>
            </span>
          </Item>
          <Item>
            <span>
              <p>Livro de Reclamações</p>
              <p>Centro de arbitragem de conflitos</p>
            </span>
          </Item>
        </ItemsContainer>
      </TopFooter>
      <BottomFooter>
        <BottomFooterContent>
          <small>
            AM Frutas, LDA <b>NIF</b> 503628360
          </small>
          <div>
            <a
              href="https://www.facebook.com/amfrutas/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} alt="Visit Facebook page" />
            </a>
            <a
              href="https://www.instagram.com/amfrutas/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={instagram}
                alt="Visit Instagram page"
                style={{ marginLeft: 46, marginRight: 46 }}
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCYzO5SWwFOUX-6uheZv8eag"
              target="_blank"
              rel="noreferrer"
            >
              <img src={youtube} alt="Visit YouTube channel" />
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <small>
              Segurança <b>100%</b>
            </small>
            <img
              src={google}
              alt="Google's logo"
              style={{ width: 111, height: 35, marginLeft: 10 }}
            />
          </div>
        </BottomFooterContent>
      </BottomFooter>
    </>
  );
}
