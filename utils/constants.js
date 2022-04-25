export const photoArray = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  profile,
  profileName,
  profileInfo,
  profileEdditButton,
  photoAddButton,
  popupProfile,
  popupProfileCloseButton,
  popupProfileForm,
  popupProfileInputs,
  popupProfileUserName,
  popupProfileUserInfo,
  popupAdd,
  popupAddCloseButton,
  popupAddForm,
  popupAddName,
  popupAddLink,
  cardsContainer,
  popupPhoto,
  popupPhotoLink,
  popupPhotoName,
  popupPhotoClose,
  forms,
};

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__description');
const profileEdditButton = profile.querySelector('.profile__eddit-button');
const photoAddButton = profile.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.pop-up_type_profile');
const popupProfileCloseButton = popupProfile.querySelector('.pop-up__close-button');
const popupProfileForm = popupProfile.querySelector('.pop-up__form');
const popupProfileInputs = Array.from(popupProfile.querySelectorAll('.pop-up__input'));
const popupProfileUserName = popupProfileForm.querySelector('.pop-up__input_field_name');
const popupProfileUserInfo = popupProfileForm.querySelector('.pop-up__input_field_info');

const popupAdd = document.querySelector('.pop-up_type_place');
const popupAddCloseButton = popupAdd.querySelector('.pop-up__close-button');
const popupAddForm = popupAdd.querySelector('.pop-up__form');
const popupAddName = popupAddForm.querySelector('.pop-up__input_field_place-name');
const popupAddLink = popupAddForm.querySelector('.pop-up__input_field_place-link');

const cardsContainer = document.querySelector('.photo-grid');

const popupPhoto = document.querySelector('.pop-up_type_photo');
const popupPhotoLink = popupPhoto.querySelector('.pop-up__image');
const popupPhotoName = popupPhoto.querySelector('.pop-up__image-caption');
const popupPhotoClose = popupPhoto.querySelector('.pop-up__close-button');

const forms = Array.from(document.querySelectorAll('.pop-up__form'));

