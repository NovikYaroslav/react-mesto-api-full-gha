export const apiconfig = {
  url: 'https://api.mesto.novik.nomoredomains.work',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-type': 'application/json',
  },
};

export const BASE_URL = 'https://api.mesto.novik.nomoredomains.work';
