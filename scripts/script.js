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

profileEdditButton.addEventListener('click',openEddit);
popupProfileCloseButton.addEventListener('click', closeEddit);
popupProfileForm.addEventListener('submit', submitEddit);

addPhotoButton.addEventListener('click', openAdd);
popupAddCloseButton.addEventListener('click', closeAdd);
popupAddForm.addEventListener('submit', submitAdd);
