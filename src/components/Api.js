import { coghortUrl, token } from "../utils/autorization";

export default class Api {
  constructor() {}

  getCards(){
    return fetch(`${coghortUrl}/cards`, {
      headers: {
        authorization: token
      }
    })
    .then(res => res.json());
  }

  getUser() {
    return fetch(`${coghortUrl}/users/me`, {
      headers: {
        authorization: token,
      }
    }).then(arg => arg.json())
    .then(arg => {
      console.log(arg)
      const info = {}
      info['user-name'] = arg.name;
      info['user-profession'] = arg.about;
      info['user-pic'] = arg.avatar;
      this._id = arg._id;
      return info;
    });
  }

  isMe(user) {
    return user._id == this._id
  }

  setUser(info) {
    const arg = {};
    arg.name = info['user-name'];
    arg.about = info['user-profession'];
    return fetch(`${coghortUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg),
    }); 
  }

  toggleLike(cardId, isLiked) {
    if (!isLiked) {return fetch(`${coghortUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
      });
    } else {return fetch(`${coghortUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
      });
    }
  } 
}