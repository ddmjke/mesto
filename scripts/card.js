const popupPhoto = document.querySelector('.pop-up_type_photo');
const popupPhotoClose = popupPhoto.querySelector('.pop-up__close-button');
const popupPhotoLink = popupPhoto.querySelector('.pop-up__image');
const popupPhotoName = popupPhoto.querySelector('.pop-up__image-caption');

export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector ||'.photo-grid__card';
  }

  _getTemplate() {
    const newNode = document.querySelector('#card-template')
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);
    return newNode;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.photo-grid__photo').src = this._link;
    this._card.querySelector('.photo-grid__photo').alt = this._name;
    this._card.querySelector('.photo-grid__textbox').textContent = this._name;
    this._setListeners();
    return this._card;
  }

  _handleOpenPopup() {
    popupPhotoLink.src = this._link;
    popupPhotoName.textContent = this._name;
    popupPhotoLink.alt = this._name;
  }

  _setListeners() {
    this._card.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
}