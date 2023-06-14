export const apiconfig = {
  // url: 'https://api.mesto.novik.nomoredomains.work',
  url: 'http://localhost:3001',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-type': 'application/json',
  },
};

export const BASE_URL = 'http://localhost:3001';
// export const BASE_URL = 'https://api.mesto.novik.nomoredomains.work';
