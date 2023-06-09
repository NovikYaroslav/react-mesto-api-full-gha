import { BASE_URL } from './data';

class Auth {
  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw new Error(error.message);
      });
    }
  }

  register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then(this._checkServerResponse);
  }

  authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkServerResponse)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
        }
      });
  }

  checkToken(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkServerResponse);
  }
}

const authApi = new Auth();

export default authApi;
