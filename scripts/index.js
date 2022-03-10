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
const popupProfileUserName = popupProfileForm.querySelector('.pop-up__input_field_name');
const popupProfileUserInfo = popupProfileForm.querySelector('.pop-up__input_field_info');

const popupAdd = document.querySelector('.pop-up_type_place');
const popupAddCloseButton = popupAdd.querySelector('.pop-up__close-button');
const popupAddForm = popupAdd.querySelector('.pop-up__form');
const popupAddName = popupAddForm.querySelector('.pop-up__input_field_place-name');
const popupAddLink = popupAddForm.querySelector('.pop-up__input_field_place-link');

const cardsContainer = document.querySelector('.photo-grid');

const popupPhoto = document.querySelector('.pop-up_type_photo');
const popupPhotoClose = popupPhoto.querySelector('.pop-up__close-button');
const popupPhotoLink = popupPhoto.querySelector('.pop-up__image');
const popupPhotoName = popupPhoto.querySelector('.pop-up__image-caption');

const cardTemplate = document.querySelector('#card-template').content;

function openPopup(element) {
  element.classList.add('pop-up_active');
}
function closePopup(element) {
  element.classList.remove('pop-up_active');
}

function fillEdditForm() {
  popupProfileUserName.value = profileName.textContent;
  popupProfileUserInfo.value = profileInfo.textContent;
}
function resetForm(element) {
  element.reset();
}
function fillPhotoPopup(evt) {
  const card = evt.target.closest('.photo-grid__card');
  popupPhotoLink.src = card.querySelector('.photo-grid__photo').src;
  popupPhotoName.textContent = card.querySelector('.photo-grid__textbox').textContent;
  popupPhotoLink.alt = popupPhotoName.textContent;
}

function submitProfile(evt) {
  profileName.textContent = popupProfileUserName.value;
  profileInfo.textContent = popupProfileUserInfo.value;
}

function submitCard(evt) {
  renderCard(addPhoto({
    name: popupAddName.value,
    link: popupAddLink.value
  }))
}

function addPhoto(args) {
  const card = cardTemplate.querySelector('.photo-grid__card').cloneNode(true);
  card.querySelector('.photo-grid__photo').src = args.link;
  card.querySelector('.photo-grid__photo').alt = args.name;
  card.querySelector('.photo-grid__textbox').textContent = args.name;

  card.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-grid__like-button_active');
  });
  card.querySelector('.photo-grid__remove-button').addEventListener('click', (evt) => {
    card.remove(evt.target.closest('.photo-grid__card'));
  });
  card.querySelector('.photo-grid__photo').addEventListener('click', (evt) => {
    fillPhotoPopup(evt);
    openPopup(popupPhoto);
  });
  return card;
}
function renderCard(elem) {
  cardsContainer.prepend(elem);
}

window.onload = initialCards.forEach((arg) => {
  renderCard(addPhoto(arg));
});

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
