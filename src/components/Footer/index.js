import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

import backend from '~/services/api';

export default function Footer() {
  const [firstColumn, setFirstColumn] = useState([null, null, null]);
  const [secondColumn, setSecondColumn] = useState([null, null]);
  const [thirdColumn, setThirdColumn] = useState([null, null]);
  const [social, setSocial] = useState([]);

  const loadMenu = useCallback(async () => {
    // const [socialMedia, links] = await Promise.all([
    //   backend.get('/menus/links/1'),
    //   backend.get('/menus/links/2'),
    // ]);
    const links = await backend.get('/menus/links/2');

    const {
      data: { data },
    } = links;

    setFirstColumn([data[0], data[1], data[2]]);
    setSecondColumn([data[3], data[4]]);
    setThirdColumn([data[5], data[6]]);

    // const {
    //   data: { data: socialData },
    // } = socialMedia;

    // setSocial(socialData);
  }, []);

  useEffect(() => loadMenu(), []);

  return (
    <>
      <TopFooter>
        <img src={logo} alt="" style={{ width: 233, height: 52 }} />
        <ItemsContainer>
          <Item>
            <span>
              {firstColumn.map(item =>
                item === null ? (
                  <></>
                ) : (
                  <Link
                    key={item.id}
                    to={{ pathname: `${item.url}`, state: { id: item.id } }}
                    rel="noreferrer"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </span>
          </Item>
          <Item>
            <span>
              {secondColumn.map(item =>
                item === null ? (
                  <></>
                ) : (
                  <Link
                    key={item.id}
                    to={{ pathname: `${item.url}`, state: { id: item.id } }}
                    rel="noreferrer"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </span>
          </Item>
          <Item>
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
      <BottomFooter>
        <BottomFooterContent>
          <small>
            AM Frutas, LDA <b>NIF</b> 503628360
          </small>
          <div>
            <a
              href={social.length !== 0 ? social[1].url : 'www.facebook.com'}
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} alt="Visit Facebook page" />
            </a>
            <a
              href={social.length !== 0 ? social[2].url : 'www.instagram.com'}
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
              href={social.length !== 0 ? social[3].url : 'www.youtube.com'}
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
