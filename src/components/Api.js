export default class Api {
  constructor({coghortUrl, token}) {
    this._url = coghortUrl;
    this._token = token;
  }

  getCards(){
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.json());
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(arg => arg.json())
    .then(arg => {
      const info = {}
      info['user-name'] = arg.name;
      info['user-profession'] = arg.about;
      info['user-pic'] = arg.avatar;
      return info;
    });
  }

  postCard(card) {
    return fetch(`${this._url}/cards`, {
      
      headers: {
        authorization: this._token
      }
    })
  }
}