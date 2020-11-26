import axios from 'axios';

const api = axios.create({ baseURL: 'https://sandbox.amfrutas.pt/backend' });

export default api;
