import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { FaSpinner } from 'react-icons/fa';

import { useQuery } from 'react-query';
import {
  Container,
  Section,
  FooterPagination,
  LoadingContainer,
  NullBlogPost,
} from './styles';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import CustomHeader from '~/components/CustomHeaderContent';
import Pagination from '~/components/Pagination';
import BlogPost from '~/components/BlogPost';

import LoginModal from '~/pages/LoginModal';

import { nameIsValid } from '~/utils/validation';

import backend from '~/services/api';

export default function Contents() {
  const [loginModal, setLoginModal] = useState(false);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [pageHeight, setPageHeight] = useState(1184);
  const [contentHeight, setContentHeight] = useState('');
  const [paginationArray, setPaginationArray] = useState([]);
  const [orderDirection, setOrderDirection] = useState('desc');
  const [orderField, setOrderField] = useState('updated_at');
  const [searchInput, setSearchInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [noContentsFound, setNoContentsFound] = useState(false);

  const firstLogin = useSelector(state => state.auth.firstLogin);

  const history = useHistory();

  useEffect(() => {
    if (firstLogin) history.push('/painel');
  }, [history, firstLogin]);

  const { state } = useLocation();

  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }

    setPaginationArray(items);
  }, [lastPage]);

  const loadContents = useCallback(async () => {
    const arrayId = state.id.split('/');
    const getId = arrayId[arrayId.length - 1];

    const {
      data: {
        data: { data, current_page, last_page },
      },
    } = await backend.get(
      `blog/contents/categories/${getId}?page=${currentPage}&per_page=12&order_field=${orderField}&order_direction=${orderDirection}`
    );

    if (isDesktop && data.length % 4 !== 0) {
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

    setLastPage(last_page);

    const contentsData = {
      contents: data,
      currentPage: current_page,
      lastPage: last_page,
    };

    return contentsData;
  }, [currentPage, state, orderField, orderDirection, isDesktop]);

  const searchContent = useCallback(async () => {
    try {
      if (nameIsValid(searchInput)) return;
      setLoading(true);
      const contentsResponse = await backend.get(
        `blog/contents/search/${searchInput}?page=${currentPage}&per_page=12&order_field=${orderField}&order_direction=${orderDirection}`
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
          data: { data, current_page, last_page },
        },
      } = contentsResponse;

      if (isDesktop && data.length % 4 !== 0) {
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
  }, [currentPage, orderField, orderDirection, searchInput, isDesktop]);

  useEffect(() => {
    if (isDesktop || contents.length === 0) return;

    const hasLastRow = contents.length * (contentHeight + 20);

    setPageHeight(hasLastRow);
  }, [isDesktop, contents, contentHeight]);

  // console.log(products.length);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError, status } = useQuery(
    [`contents/${state.id}`, currentPage, orderField, orderDirection],
    loadContents,
    {
      staleTime: 1000 * 60 * 30,
    }
  );

  useEffect(() => {
    if (isLoading) return;

    if (nameIsValid(searchInput)) {
      setContents(data.contents);
      setLastPage(data.lastPage);

      return;
    }

    setNoContentsFound(false);
    const timer = setTimeout(searchContent, 1000);

    return () => clearTimeout(timer);
  }, [data, searchInput, isLoading, generatePaginationArray, searchContent]);

  useEffect(() => {
    generatePaginationArray();
  }, [generatePaginationArray, lastPage]);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Dicas" />
      <Container isDesktop={isDesktop}>
        {!isLoading && (
          <CustomHeader
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            paginationArray={paginationArray}
            setOrderDirection={setOrderDirection}
            setOrderField={setOrderField}
            orderField={orderField}
            inputValue={searchInput}
            setInputValue={setSearchInput}
            search={searchContent}
            style={
              isDesktop
                ? { marginLeft: 'auto', marginRight: 'auto', width: 1240 }
                : {}
            }
          />
        )}
        <div
          style={
            isDesktop ? { height: 1056 } : { height: pageHeight, width: '100%' }
          }
        >
          <Section pageHeight={isDesktop ? 1056 : 'auto'} isDesktop={isDesktop}>
            {loading || isLoading ? (
              <LoadingContainer isDesktop={isDesktop}>
                <FaSpinner color="#666" size={42} />
                <strong>Loading blog contents...</strong>
              </LoadingContainer>
            ) : noContentsFound ? (
              <LoadingContainer isDesktop={isDesktop}>
                <strong>
                  We couldn&apos;t find any content matching your search. <br />{' '}
                  Try again.
                </strong>
              </LoadingContainer>
            ) : (
              !isError &&
              status === 'success' &&
              contents.map((content, index) =>
                content === null ? (
                  <NullBlogPost isDesktop={isDesktop} />
                ) : (
                  <BlogPost
                    key={content.id}
                    content={content}
                    index={index}
                    setHeight={setContentHeight}
                  />
                )
              )
            )}
          </Section>
        </div>

        <FooterPagination isDesktop={isDesktop}>
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              setCurrentPage={setCurrentPage}
              paginationArray={paginationArray}
              isDesktop={isDesktop}
            />
          )}
        </FooterPagination>
      </Container>
      <Footer />

      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
