export default class Card {
  constructor({name, link, likes, isLiked, isSalfe, cardId, toggleLike, handleClick, handleDelete}, cardSelector) {
    this._name = name;
    this._link = link;

    this._likes = likes;
    this._isLiked = isLiked;
    this._self = isSalfe;

    this._id = cardId;
    this._toggleLike = toggleLike;

    this._handleClick = handleClick;
    this._handleDelete = handleDelete;
    this._cardSelector = cardSelector;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.photo-grid__photo').src = this._link;
    this._card.querySelector('.photo-grid__photo').alt = this._name;
    this._card.querySelector('.photo-grid__textbox').textContent = this._name;
    this._likeButton = this._card.querySelector('.photo-grid__like-button');
    this._likesElement = this._card.querySelector('.photo-grid__likes');

    if (this._self) this._card.querySelector('.photo-grid__remove-button').classList.add('photo-grid__remove-button_visible');
    if (this._isLiked) this._likeButton.classList.add('photo-grid__like-button_active');
    this._likesElement.textContent = this._likes;
    this._setListeners();
    return this._card;
  }
  
  _getTemplate() {
    const newNode = document.querySelector('#card-template')
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);
    return newNode;
  }
  
  _setListeners() {
    this._card.addEventListener('click', evt => this._handleClick(evt));
    this._likeButton.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._handleLikeButton();
    });
    if (this._self) this._card.querySelector('.photo-grid__remove-button').addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._handleDelete(this._id)
        .then(() => {
          this._card.remove();
          this._card = null;
        })
    });
  }

  _handleLikeButton() {
    this._toggleLike(this._id, this._isLiked)
      .then(res => {
        if (res.ok) return res.json()
          else return Promise.reject(res.status);
      })
      .then(card => {
        this._isLiked = !this._isLiked;
        this._likeButton.classList.toggle('photo-grid__like-button_active');
        this._likes = card.likes.length;
        this._likesElement.textContent = card.likes.length;
      })
      .catch(err => console.log(err));
  }
}
