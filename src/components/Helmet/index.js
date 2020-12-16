import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import backend from '~/services/api';

export default function CustomHelmet() {
  const { pathname } = useLocation();

  const [metaData, setMetaData] = useState([]);
  const [scriptData, setScriptData] = useState('');
  const [title, setTitle] = useState('AM Frutas');

  const loadData = useCallback(async () => {
    const keys = ['scripts'];
    try {
      let response;

      if (pathname === '/') response = await backend.get(`/seos`);
      else {
        response = await backend.get(`/seos/${pathname}`);
      }

      const {
        data: { data: scriptResponse },
      } = await backend.get('configurations', { keys });

      const {
        data: { data },
      } = response;

      setScriptData(scriptResponse.scripts);

      const formattedData = Object.entries(data);

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
    </Helmet>
  );
}
