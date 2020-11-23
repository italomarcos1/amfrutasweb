import axios from 'axios';

const backend = axios.create({ baseURL: 'https://amfrutas.pt/backend' });
const api = axios.create({ baseURL: 'https://amfrutas.pt/api-v2' });

export { backend, api };
