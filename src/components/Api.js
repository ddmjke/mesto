export default class Api {
  constructor({coghortUrl, token}) {
    this._root = coghortUrl;
    this._token = token;

    //they all loosing it somehow 
    // but class structure is defined by higher powers
    this.getCards = this.getCards.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
    this.setCard = this.setCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

  }

  getCards(){
    return fetch(`${this._root}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) return res.json()
        else return Promise.reject(`HTTP error: ${res.status}`);
    });
  }

  getUser() {
    return fetch(`${this._root}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(res => {
      if (res.ok) return res.json()
        else return Promise.reject(`HTTP error: ${res.status}`);
    })
    .then(res => {
      const info = {}
      info['user-name'] = res.name;
      info['user-profession'] = res.about;
      info['user-pic'] = res.avatar;
      this._id = res._id;
      return info;
    })
    .catch(err => console.log(`Network error: ${err}`))
  }

  isMe(user) {
    return user._id == this._id
  }

  setUser(info) {
    const arg = {};
    arg.name = info['user-name'];
    arg.about = info['user-profession'];
    return fetch(`${this._root}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg),
    }); 
  }

  toggleLike(cardId, isLiked) {
    if (!isLiked) {return fetch(`${this._root}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      });
    } else {return fetch(`${this._root}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      });
    }
  }

  setAvatar(arg) {
    return fetch(`${this._root}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg),
    });
  }

  setCard(card) {
    return fetch(`${this._root}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(card),
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._root}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    });
  }
}