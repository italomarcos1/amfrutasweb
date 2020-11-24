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
import CustomHeader from '~/components/CustomHeader';

import LoginModal from '~/pages/LoginModal';

import { backend } from '~/services/api';

export default function Contents() {
  const [loginModal, setLoginModal] = useState(false);

  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const loadContents = useCallback(async () => {
    const {
      data: {
        data: { data, current_page },
      },
    } = await backend.get('blog/contents?per_page=12');

    if (data.length % 4 !== 0) {
      const itemsToFill = Math.ceil(data.length / 4) * 4 - data.length;

      for (let i = 0; i < itemsToFill; i++) {
        data.push(null);
      }
    }
    setCurrentPage(current_page);
    setContents(data);
  }, []);

  useEffect(() => {
    loadContents();
  }, []);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Dicas" />
      <Container>
        <CustomHeader
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          style={{ marginLeft: 'auto', marginRight: 'auto', width: 1240 }}
        />

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
