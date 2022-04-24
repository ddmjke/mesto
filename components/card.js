import {openPopup, popupPhoto, popupPhotoLink, popupPhotoName} from '../pages/index.js';

export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector ||'.photo-grid__card';
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
  
  _fillPhotoPopup() {
    popupPhotoLink.src = this._link;
    popupPhotoName.textContent = this._name;
    popupPhotoLink.alt = this._name;
  }

  _setListeners() {
    this._card.addEventListener('click', (evt) => {
      this._fillPhotoPopup();
      openPopup(popupPhoto);
    });
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
