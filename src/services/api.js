import axios from 'axios';
import uuid from 'react-uuid';

// axios.defaults.baseURL = 'https://sandbox.amfrutas.pt/backend';
axios.defaults.baseURL = 'https://laravel58.amfrutas.pt/backend';

axios.interceptors.request.use(async config => {
  const newUuid = uuid();
  const currentUuid = localStorage.getItem('@uuid');

  if (!currentUuid || typeof currentUuid !== 'string') {
    localStorage.setItem('@uuid', newUuid);

    config.headers.common.uuid = newUuid;

    return config;
  }

  config.headers.common.uuid = currentUuid;

  return config;
});

export default axios;
