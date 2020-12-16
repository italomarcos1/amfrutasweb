import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

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

  const [firstColumn, setFirstColumn] = useState([null, null, null]);
  const [secondColumn, setSecondColumn] = useState([null, null]);
  const [thirdColumn, setThirdColumn] = useState([null, null]);
  const [social, setSocial] = useState(null);

  const keys = ['facebook', 'instagram', 'twitter', 'youtube', 'social_nif'];

  const loadMenu = useCallback(async () => {
    const [socialMedia, links] = await Promise.all([
      backend.get('configurations', { keys }),
      backend.get('/menus/links/2'),
    ]);

    const {
      data: { data },
    } = links;

    setFirstColumn([data[0], data[1], data[2]]);
    setSecondColumn([data[3], data[4]]);
    setThirdColumn([data[5], data[6]]);

    const {
      data: { data: socialData },
    } = socialMedia;

    const { facebook, instagram, youtube, social_nif } = socialData;

    setSocial({
      facebook,
      instagram,
      youtube,
      social_nif,
    });
  }, []);

  useEffect(loadMenu, [loadMenu]);

  return (
    <>
      <TopFooter isDesktop={isDesktop}>
        <img src={logo} alt="" style={{ width: 233, height: 52 }} />
        <ItemsContainer isDesktop={isDesktop}>
          <Item isDesktop={isDesktop}>
            <span>
              {firstColumn.map(item =>
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
              {secondColumn.map(item =>
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
              {thirdColumn.map(item =>
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
      </TopFooter>
      <BottomFooter isDesktop={isDesktop}>
        <BottomFooterContent isDesktop={isDesktop}>
          <small>{!!social ? social.social_nif : ''}</small>
          <div>
            <a
              href={
                !!social ? `https://www.facebook.com/${social.facebook}` : ''
              }
              target="_blank"
              rel="noreferrer"
            >
              <img src={fbLogo} alt="Visit Facebook page" />
            </a>
            <a
              href={!!social ? `https://instagram.com/${social.instagram}` : ''}
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
                !!social ? `https://youtube.com/channel/${social.youtube}` : ''
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
      </BottomFooter>
    </>
  );
}
