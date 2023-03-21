export const apiconfig = {
  // тут домен бэка
  url: 'https://api.mesto.novik.nomoredomains.work',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-type': 'application/json',
  },
};

// тут домен бэка
export const BASE_URL = 'https://api.mesto.novik.nomoredomains.work';
