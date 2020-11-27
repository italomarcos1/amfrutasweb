import axios from 'axios';

const backend = axios.create({
  baseURL: 'https://sandbox.amfrutas.pt/backend',
});

export default backend;
