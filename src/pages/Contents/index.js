import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import {
  Container,
  Section,
  BlogPost,
  FooterPagination,
  LoadingContainer,
} from './styles';

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
  const [orderDirection, setOrderDirection] = useState('desc');
  const [orderField, setOrderField] = useState('updated_at');
  const [searchInput, setSearchInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [noContentsFound, setNoContentsFound] = useState(false);

  const { state } = useLocation();

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }

    setPaginationArray(items);
  }, [lastPage]);

  const loadContents = useCallback(async () => {
    if (searchInput !== '') return;

    const arrayId = state.id.split('/');
    const getId = arrayId[arrayId.length - 1];

    const {
      data: {
        data: { data, current_page, last_page },
      },
    } = await backend.get(
      `blog/contents/categories/${getId}?page=${currentPage}&per_page=12&&order_field=${orderField}&order_direction=${orderDirection}`
    );

    if (data.length % 4 !== 0) {
      const itemsToFill = Math.ceil(data.length / 4) * 4 - data.length;

      for (let i = 0; i < itemsToFill; i++) {
        data.push(null);
      }

      if (data.length / 12 < 0.75) {
        for (let i = 0; i < 12 - data.length; i++) {
          data.push(null);
        }
      }
    }
    setCurrentPage(current_page);
    setLastPage(last_page);
    setContents(data);
  }, [currentPage, state, orderField, orderDirection, searchInput]);

  const searchContent = useCallback(async () => {
    try {
      if (searchInput === '') return;
      setLoading(true);
      const contentsResponse = await backend.get(
        `blog/contents/search/${searchInput}?page=${currentPage}&order_field=${orderField}&order_direction=${orderDirection}`
      );
      const {
        data: {
          meta: { message },
        },
      } = contentsResponse;

      if (message === 'Nenhum registro encontrado') {
        setNoContentsFound(true);
        return;
      }

      const {
        data: {
          data: { data, current_page, last_page, next_page_url, prev_page_url },
        },
      } = contentsResponse;

      if (data.length % 4 !== 0) {
        const itemsToFill = Math.ceil(data.length / 4) * 4 - data.length;

        for (let i = 0; i < itemsToFill; i++) {
          data.push(null);
        }

        if (data.length / 12 < 0.75) {
          for (let i = 0; i < 12 - data.length; i++) {
            data.push(null);
          }
        }
      }

      setCurrentPage(current_page);

      setLastPage(last_page);
      setContents(data);
      setLoading(false);
    } catch {
      setLoading(false);
      alert('Erro');
    }
  }, [currentPage, orderField, orderDirection, searchInput]);

  useEffect(() => {
    loadContents();
    generatePaginationArray();
  }, [loadContents, generatePaginationArray, currentPage]);

  useEffect(() => {
    setNoContentsFound(false);
    searchContent();
  }, [searchInput, searchContent]);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Dicas" />
      <Container>
        <CustomHeader
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          paginationArray={paginationArray}
          setOrderDirection={setOrderDirection}
          setOrderField={setOrderField}
          orderField={orderField}
          isInfo
          inputValue={searchInput}
          setInputValue={setSearchInput}
          search={searchContent}
          style={{ marginLeft: 'auto', marginRight: 'auto', width: 1240 }}
        />

        <Section>
          {loading ? (
            <LoadingContainer>
              <FaSpinner color="#666" size={42} />
              <strong>Carregando os conteúdos do blog, aguarde...</strong>
            </LoadingContainer>
          ) : noContentsFound ? (
            <LoadingContainer>
              <strong>
                Não encontramos nenhuma conteúdo com esse nome no blog. <br />{' '}
                Tente novamente.
              </strong>
            </LoadingContainer>
          ) : (
            contents.map(content =>
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
