import React, { useCallback, useEffect, useState } from 'react';

import { Container, Section, BlogPost, FooterPagination } from './styles';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import CustomHeader from '~/components/CustomHeader';
import Pagination from '~/components/Pagination';

import LoginModal from '~/pages/LoginModal';

import backend from '~/services/api';

export default function Contents() {
  const [loginModal, setLoginModal] = useState(false);

  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [paginationArray, setPaginationArray] = useState([]);

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }

    setPaginationArray(items);
  }, [lastPage]);

  const loadContents = useCallback(async () => {
    const {
      data: {
        data: { data, current_page, last_page },
      },
    } = await backend.get(`blog/contents?page=${currentPage}&per_page=12`);

    if (data.length % 4 !== 0) {
      const itemsToFill = Math.ceil(data.length / 4) * 4 - data.length;

      for (let i = 0; i < itemsToFill; i++) {
        data.push(null);
      }
    }
    setCurrentPage(current_page);
    setLastPage(last_page);
    setContents(data);
  }, [currentPage]);

  useEffect(() => {
    loadContents();
    generatePaginationArray();
  }, [loadContents, generatePaginationArray, currentPage]);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Dicas" />
      <Container>
        <CustomHeader
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          paginationArray={paginationArray}
          style={{ marginLeft: 'auto', marginRight: 'auto', width: 1240 }}
        />

        <Section>
          {contents.map(content =>
            content === null ? (
              <BlogPost isNull />
            ) : (
              <BlogPost
                key={content.id}
                to={{
                  pathname: `/${content.url}`,
                  state: { id: content.id },
                }}
              >
                <img src={content.thumbs} alt="" />
                <strong>{content.title}</strong>
                <small>{content.description}</small>
              </BlogPost>
            )
          )}
        </Section>
        <FooterPagination>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            paginationArray={paginationArray}
          />
        </FooterPagination>
      </Container>
      <Footer />

      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
