import Card from "./card.js";
import Validator from "./validator.js";

const initialCards = [
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


//============ popup handlers
function closeByEsc(evt, element) {
  if (evt.key === 'Escape') {
    const element = document.querySelector('.pop-up_active');
    closePopup(element);
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('pop-up')) closePopup(evt.target);
}

function openPopup(element) {
  //element.querySelector('.pop-up__input').dispatchEvent(new Event('input', {bubbles:true}));
  element.classList.add('pop-up_active');
  document.addEventListener('keydown', closeByEsc);
  element.addEventListener('click', closeByOverlay)
}

function closePopup(element) {
  element.classList.remove('pop-up_active');
  document.removeEventListener('keydown',closeByEsc);
  element.removeEventListener('click', closeByOverlay);
  
}

//forcing validation here by input event
function fillEdditForm() {
  popupProfileUserName.value = profileName.textContent;
  popupProfileUserInfo.value = profileInfo.textContent;
  popupProfileInputs.forEach((input) => {
    input.dispatchEvent(new Event('input', {bubbles:true}))
  });
}

function resetForm(element) {
  element.reset();
}

function submitProfile(evt) {
  profileName.textContent = popupProfileUserName.value;
  profileInfo.textContent = popupProfileUserInfo.value;
}

//============== cards rendering
function submitCard(evt) {
  renderCards({
    name: popupAddName.value,
    link: popupAddLink.value,
  });
}

function renderCards(...photos) {
  photos.forEach((photo) => {
    const card = new Card(photo.name, photo.link, '.photo-grid__card');
    cardsContainer.prepend(card.generateCard());
  });
}

window.onload = renderCards(...initialCards);

//=============== Listeners

profileEdditButton.addEventListener('click',() => {
  fillEdditForm();
  openPopup(popupProfile);
});
popupProfileCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup(popupProfile);
});
popupProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitProfile();
  closePopup(popupProfile);
});

photoAddButton.addEventListener('click', () => {
  resetForm(popupAddForm);
  openPopup(popupAdd);
});
popupAddCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup(popupAdd);
});
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitCard();
  closePopup(popupAdd);
});

popupPhotoClose.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup(popupPhoto);
});

//============= validation
function enableValidation(keys, forms) {
  forms.forEach((form) => {
    const validator = new Validator(keys, form);
    validator.enable();
  })
}

enableValidation({
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__submit-button',
  inactiveButtonClass: 'pop-up__submit-button_inactive',
  inputErrorClass: 'pop-up__input_invalid',
  errorClass: 'pop-up__input-error_visable',
}, forms);

//============= photo pop-up functionality expors
export {openPopup, popupPhoto, popupPhotoLink, popupPhotoName};