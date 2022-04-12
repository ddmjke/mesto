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

  _fillPhotoPopup() {
    popupPhotoLink.src = this._link;
    popupPhotoName.textContent = this._name;
    popupPhotoLink.alt = this._name;
  }

    _setListeners() {
    this._card.addEventListener('click', () => {
      this._fillPhotoPopup();
    });
    this._card.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-grid__like-button_active');
    });
    this._card.querySelector('.photo-grid__remove-button').addEventListener('click', (evt) => {
      this._card.remove();
    });
  }
}

// function addPhoto(args) {
//   const card = cardTemplate.querySelector('.photo-grid__card').cloneNode(true);
//   card.querySelector('.photo-grid__photo').src = args.link;
//   card.querySelector('.photo-grid__photo').alt = args.name;
//   card.querySelector('.photo-grid__textbox').textContent = args.name;

//   card.querySelector('.photo-grid__photo').addEventListener('click', (evt) => {
//     fillPhotoPopup(evt);
//     openPopup(popupPhoto);
//   });
//   return card;
// }

// card.querySelector('.photo-grid__photo').addEventListener('click', (evt) => {
//   fillPhotoPopup(evt);
//   openPopup(popupPhoto);
// });