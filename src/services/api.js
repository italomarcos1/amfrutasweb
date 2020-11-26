import axios from 'axios';

const api = axios.create({ baseURL: 'https://amfrutas.pt/backend' });

export default api;
