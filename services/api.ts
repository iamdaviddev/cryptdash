import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rest.coincap.io/v3',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_COINCAP_API_KEY}`,
  },
});

