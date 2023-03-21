class Api {
  constructor({ url, teamId, headers }, jwt) {
    this._url = url;
    this._headers = headers;
    this._headers.authorization = `Bearer ${jwt}`;
    this._teamId = teamId;
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'GET',
    }).then(this._checkServerResponse);
  }

  addCards(newCardData) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: `${newCardData.name}`,
        link: `${newCardData.link}`,
      }),
    }).then(this._checkServerResponse);
  }

  getUserInfoFromServer() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'GET',
    }).then(this._checkServerResponse);
  }

  editUserInfo(profileData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${profileData.name}`,
        about: `${profileData.about}`,
      }),
    }).then(this._checkServerResponse);
  }

  editUserAvatar(avatarData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarData.avatar}`,
      }),
    }).then(this._checkServerResponse);
  }

  changeCardLikeStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      }).then(this._checkServerResponse);
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        headers: this._headers,
        method: 'DELETE',
      }).then(this._checkServerResponse);
    }
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then(this._checkServerResponse);
  }
}

export default Api;
