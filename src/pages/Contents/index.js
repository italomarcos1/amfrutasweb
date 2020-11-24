import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  OptionsContainer,
  Option,
  Section,
  BlogPost,
} from './styles';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

import LoginModal from '~/pages/LoginModal';

import { backend } from '~/services/api';

import envio from '~/assets/envio-gratuito.svg';
import cashback from '~/assets/cashback.svg';
import whatsapp from '~/assets/whatsapp.svg';

export default function Contents() {
  const [loginModal, setLoginModal] = useState(false);

  const [contents, setContents] = useState([]);

  const loadContents = useCallback(async () => {
    const {
      data: {
        data: { data },
      },
    } = await backend.get('blog/contents');

    if (data.length % 4 !== 0) {
      const itemsToFill = Math.ceil(data.length / 4) * 4 - data.length;

      for (let i = 0; i < itemsToFill; i++) {
        data.push(null);
      }
    }

    setContents(data);
  }, []);

  useEffect(() => {
    loadContents();
  }, []);

  return (
    <>
      <Header login={() => setLoginModal(true)} />
      <Container>
        <OptionsContainer>
          <Option>
            <img src={envio} alt="Envio Gratuito" />
            <div>
              <strong>Envio Gratuito</strong>
              <small>Para compras acima de € 50,00</small>
            </div>
          </Option>
          <Option>
            <img src={cashback} alt="Cashback" />
            <div>
              <strong>Cashback</strong>
              <small>Receba euros nas compras</small>
            </div>
          </Option>
          <Option>
            <img src={whatsapp} alt="WhatsApp" />
            <div>
              <strong>Atendimento</strong>
              <small>Dúvidas online no WhatsApp</small>
            </div>
          </Option>
        </OptionsContainer>

        <Section>
          {contents.map(content =>
            content === null ? (
              <BlogPost isNull />
            ) : (
              <BlogPost key={content.id} to={content.url}>
                <img src={content.thumbs} alt="" />
                <strong>{content.title}</strong>
                <small>
                  Todos nós sabemos que os <br />
                  sumos detox são ótimos para a <br />
                  saúde e para o sistema imunitário
                  <br /> … infelizmente muita gente acha
                </small>
              </BlogPost>
            )
          )}
        </Section>
      </Container>
      <Footer />

      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
