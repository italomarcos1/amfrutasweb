import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import backend from '~/services/api';

export default function CustomHelmet() {
  const { pathname } = useLocation();

  const [metaData, setMetaData] = useState([]);
  const [metaProperties, setMetaProperties] = useState([]);
  const [scriptData, setScriptData] = useState('');
  const [title, setTitle] = useState('AM Frutas');

  const loadData = useCallback(async () => {
    const keys = ['scripts'];
    try {
      let response;

      if (pathname === '/') response = await backend.get(`/seos`);
      else {
        const formattingPathname = [...pathname];
        formattingPathname.splice(0, 1);
        response = await backend.get(`/seos/${formattingPathname.join('')}`);
      }

      const {
        data: { data: scriptResponse },
      } = await backend.get(`configurations?keys=${keys.join()}`);

      const {
        data: { data },
      } = response;

      setScriptData(scriptResponse.scripts);

      const formattedData = Object.entries(data);

      const filterProperties = formattedData.filter(
        el =>
          el[0] === 'page_image' ||
          el[0] === 'page_title' ||
          el[0] === 'page_description'
      );

      const formatFilterProperties = filterProperties.map(el => {
        const value = [...el[0]];
        value.splice(0, 5);
        return [value.join(''), el[1]];
      });

      setMetaProperties(formatFilterProperties);

      const findIndex = formattedData.findIndex(el => el[0] === 'page_image');
      if (findIndex > -1) {
        formattedData.push(['og:image', formattedData[findIndex][1]]);
        formattedData.push(['image', formattedData[findIndex][1]]);
      }

      setMetaData(formattedData);

      setTitle(`AM Frutas | ${formattedData[1][1]}`);
    } catch {
      console.log('erro no request de script');
    }
  }, [pathname]);

  useEffect(() => loadData(), [loadData, pathname]);

  return (
    <Helmet>
      <title>{title}</title>
      {scriptData}
      {metaData.length !== 0 ? (
        metaData.map(meta => <meta name={meta[0]} content={meta[1]} />)
      ) : (
        <meta charSet="utf-8" />
      )}
      {metaData.length !== 0 ? (
        metaProperties.map(meta => (
          <meta property={`og:${meta[0]}`} content={meta[1]} />
        ))
      ) : (
        <meta charSet="utf-8" />
      )}
    </Helmet>
  );
}
