import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useQuery } from 'react-query';
import {
  TopFooter,
  BottomFooter,
  BottomFooterContent,
  ItemsContainer,
  Item,
} from './styles';
import logo from '~/assets/amfrutas-bottom.svg';

import fbLogo from '~/assets/facebook.svg';
import igLogo from '~/assets/instagram.svg';
import ytLogo from '~/assets/youtube.svg';
import google from '~/assets/google.svg';

import backend from '~/services/api';

export default function Footer() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  // const [firstColumn, setFirstColumn] = useState([null, null, null]);
  // const [secondColumn, setSecondColumn] = useState([null, null]);
  // const [thirdColumn, setThirdColumn] = useState([null, null]);
  // const [social, setSocial] = useState(null);

  const keys = ['facebook', 'instagram', 'twitter', 'youtube', 'social_nif'];

  const loadMenu = useCallback(async () => {
    const [socialMedia, links] = await Promise.all([
      backend.get(`configurations?keys=${keys.join()}`),
      backend.get('/menus/links/2'),
    ]);

    const {
      data: { data },
    } = links;

    const firstColumn = [data[0], data[1], data[2]];
    const secondColumn = [data[3], data[4]];
    const thirdColumn = [data[5], data[6]];

    const {
      data: { data: social },
    } = socialMedia;

    const footerData = { firstColumn, secondColumn, thirdColumn, social };
    console.log(footerData);
    return footerData;
  }, [keys]);

  const { data, isLoading, status } = useQuery('footer', loadMenu, {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return (
    <>
      <TopFooter isDesktop={isDesktop}>
        <img src={logo} alt="" style={{ width: 233, height: 52 }} />
        {!isLoading && status === 'success' && (
          <ItemsContainer isDesktop={isDesktop}>
            <Item isDesktop={isDesktop}>
              <span>
                {data.firstColumn.map(item =>
                  item === null ? (
                    <></>
                  ) : (
                    <Link
                      key={item.id}
                      to={{ pathname: `${item.url}`, state: { id: item.url } }}
                      rel="noreferrer"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </span>
            </Item>
            <Item isDesktop={isDesktop}>
              <span>
                {data.secondColumn.map(item =>
                  item === null ? (
                    <></>
                  ) : (
                    <Link
                      key={item.id}
                      to={{ pathname: `${item.url}`, state: { id: item.url } }}
                      rel="noreferrer"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </span>
            </Item>
            <Item isDesktop={isDesktop}>
              <span>
                {data.thirdColumn.map(item =>
                  item === null ? (
                    <></>
                  ) : (
                    <a
                      key={item.id}
                      href={item.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </span>
            </Item>
          </ItemsContainer>
        )}
      </TopFooter>
      <BottomFooter isDesktop={isDesktop}>
        {!isLoading && status === 'success' && (
          <BottomFooterContent isDesktop={isDesktop}>
            <small>{!!data.social ? data.social.social_nif : ''}</small>
            <div>
              <a
                href={
                  !!data.social
                    ? `https://www.facebook.com/${data.social.facebook}`
                    : ''
                }
                target="_blank"
                rel="noreferrer"
              >
                <img src={fbLogo} alt="Visit Facebook page" />
              </a>
              <a
                href={
                  !!data.social
                    ? `https://instagram.com/${data.social.instagram}`
                    : ''
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={igLogo}
                  alt="Visit Instagram page"
                  style={{ marginLeft: 46, marginRight: 46 }}
                />
              </a>
              <a
                href={
                  !!data.social
                    ? `https://youtube.com/channel/${data.social.youtube}`
                    : ''
                }
                target="_blank"
                rel="noreferrer"
              >
                <img src={ytLogo} alt="Visit YouTube channel" />
              </a>
            </div>
            <a
              style={{
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
              href={`https://transparencyreport.google.com/safe-browsing/search?url=${window.location.hostname}`}
              rel="noreferrer"
              target="_blank"
            >
              <small>
                Segurança <b>100%</b>
              </small>
              <img
                src={google}
                alt="Google's logo"
                style={{ width: 111, height: 35, marginLeft: 10 }}
              />
            </a>
          </BottomFooterContent>
        )}
      </BottomFooter>
    </>
  );
}
