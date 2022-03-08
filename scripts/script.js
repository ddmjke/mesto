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
const addPhotoButton = profile.querySelector('.profile__add-button');

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

const cards = document.querySelector('.photo-grid');

const popupPhoto = document.querySelector('.pop-up_type_photo');
const popupPhotoClose = popupPhoto.querySelector('.pop-up__close-button');

const cardTemplate = document.querySelector('#card-template').content;

function openEddit() {
  popupProfileUserName.value = profileName.textContent;
  popupProfileUserInfo.value = profileInfo.textContent;
  popupProfile.classList.add('pop-up_active');
}
function closeEddit(evt) {
  evt.preventDefault(); 
  popupProfile.classList.remove('pop-up_active');
}
function submitEddit(evt) {
  evt.preventDefault(); 
  profileName.textContent = popupProfileUserName.value;
  profileInfo.textContent = popupProfileUserInfo.value;
  closeEddit(evt);
}

function openAdd() {
  popupAddName.value = '';
  popupAddLink.value = '';
  popupAdd.classList.add('pop-up_active');
}
function closeAdd(evt) {
  evt.preventDefault();
  popupAdd.classList.remove('pop-up_active');
}
function submitAdd(evt) {
  evt.preventDefault();
  addPhoto({
    name: popupAddName.value,
    link: popupAddLink.value
  })
  closeAdd(evt);
}

function openPhoto(evt) {
  popupPhoto.querySelector('.pop-up__image').src = evt.target.closest('.photo-grid__photo').src;
  popupPhoto.querySelector('.pop-up__image-caption').textContent = evt.target.closest('.photo-grid__card').querySelector('.photo-grid__textbox').textContent;
  popupPhoto.classList.add('pop-up_active');
}
function closePhoto(evt) {
  evt.preventDefault();
  popupPhoto.classList.remove('pop-up_active');
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
  card.querySelector('.photo-grid__photo').addEventListener('click', openPhoto);
  cards.append(card);
}

window.onload = initialCards.map(addPhoto);

profileEdditButton.addEventListener('click',openEddit);
popupProfileCloseButton.addEventListener('click', closeEddit);
popupProfileForm.addEventListener('submit', submitEddit);

addPhotoButton.addEventListener('click', openAdd);
popupAddCloseButton.addEventListener('click', closeAdd);
popupAddForm.addEventListener('submit', submitAdd);

popupPhotoClose.addEventListener('click', closePhoto);
