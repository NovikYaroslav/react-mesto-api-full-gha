export const apiconfig = {
  // тут домен бэка
  url: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-type': 'application/json',
  },
};

// тут домен бэка
export const BASE_URL = 'http://localhost:3000';
