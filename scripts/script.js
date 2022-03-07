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

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileInfo = profile.querySelector('.profile__description');
let profileEdditButton = profile.querySelector('.profile__eddit-button');
let addPhotoButton = profile.querySelector('.profile__add-button');

let popupProfile = document.querySelector('.pop-up_type_profile');
let popupProfileCloseButton = popupProfile.querySelector('.pop-up__close-button');
let popupProfileForm = popupProfile.querySelector('.pop-up__form');
let popupProfileUserName = popupProfileForm.querySelector('.pop-up__input_field_name');
let popupProfileUserInfo = popupProfileForm.querySelector('.pop-up__input_field_info');

let popupAdd = document.querySelector('.pop-up_type_place');
let popupAddCloseButton = popupAdd.querySelector('.pop-up__close-button');
let popupAddForm = popupAdd.querySelector('.pop-up__form');
let popupAddName = popupAddForm.querySelector('.pop-up__input_field_place-name');
let popupAddLink = popupAddForm.querySelector('.pop-up__input_field_place-link');

let cards = document.querySelector('.photo-grid');


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
  closeAdd(evt);
}

function addPhoto(args) {
  // const photoGrid = document.querySelector('photo-grid');

  const photoCardElement = document.createElement('div');
  photoCardElement.classList.add('photo-grid__card');

  const photoCardImage = document.createElement('img');
  photoCardImage.classList.add('photo-grid__photo');
  photoCardImage.src = args.link;
  photoCardImage.alt = args.name;

  const photoCardRemoveButton = document.createElement('button');
  photoCardRemoveButton.classList.add('photo-grid__remove-button');

  const photoCaptionContainer = document.createElement('div');
  photoCaptionContainer.classList.add('photo-grid__caption');
  
  const photoCaptionText = document.createElement('h2');
  photoCaptionText.classList.add('photo-grid__textbox');
  photoCaptionText.textContent = args.name;

  const photoCaptionLikeButton = document.createElement('button');
  photoCaptionLikeButton.classList.add('photo-grid__like-button');
  photoCaptionLikeButton.type = 'button';

  photoCaptionContainer.append(photoCaptionText, photoCaptionLikeButton);
  photoCardElement.append(photoCardImage, photoCardRemoveButton, photoCaptionContainer);
  cards.append(photoCardElement);
  
  // cards.insertAdjacentHTML("beforeend",`
  //   <div class="photo-grid__card">
  //   <img class="photo-grid__photo" src="${args.link}" alt="${args.name}">
  //   <button class="photo-grid__remove-button"></button>
  //   <div class="photo-grid__caption">
  //     <h2 class="photo-grid__textbox">${args.name}</h2>
  //     <button class="photo-grid__like-button" type="button"></button>
  //   </div>
  //   </div>
  // `)
}

initialCards.map(addPhoto);

profileEdditButton.addEventListener('click',openEddit);
popupProfileCloseButton.addEventListener('click', closeEddit);
popupProfileForm.addEventListener('submit', submitEddit);

addPhotoButton.addEventListener('click', openAdd);
popupAddCloseButton.addEventListener('click', closeAdd);
popupAddForm.addEventListener('submit', submitAdd);
