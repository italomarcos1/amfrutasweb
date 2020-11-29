import axios from 'axios';

const backend = axios.create({
  baseURL: 'https://sandbox.amfrutas.pt/backend',
});

export const postcodes = axios.create({
  baseURL: 'http://localhost:3333',
});

export default backend;
