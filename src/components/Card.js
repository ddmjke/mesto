export default class Card {
  constructor({name, link, handleClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._handleClick = handleClick;
    this._cardSelector = cardSelector;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.photo-grid__photo').src = this._link;
    this._card.querySelector('.photo-grid__photo').alt = this._name;
    this._card.querySelector('.photo-grid__textbox').textContent = this._name;
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
    this._card.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
      evt.stopPropagation();
      evt.target.classList.toggle('photo-grid__like-button_active');
    });
    this._card.querySelector('.photo-grid__remove-button').addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._card.remove();
      this._card = null;
    });
  }
}