let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileInfo = profile.querySelector('.profile__description');
let profileEdditButton = profile.querySelector('.profile__eddit-button');

let popup = document.querySelector('.pop-up');
let popupCloseButton = popup.querySelector('.pop-up__close-button');
let popupForm = popup.querySelector('.pop-up__form');
let popupUserName = popupForm.querySelector('.pop-up__input_field_name')
let popupUserInfo = popupForm.querySelector('.pop-up__input_field_info')

function openEddit() {
  popupUserName.value = profileName.textContent;
  popupUserInfo.value = profileInfo.textContent;
  popup.classList.add('pop-up_active');
}
function closeEddit(evt) {
  evt.preventDefault(); 
  popup.classList.remove('pop-up_active');
}
function submitEddit(evt) {
  evt.preventDefault(); 
  profileName.textContent = popupUserName.value;
  profileInfo.textContent = popupUserInfo.value;
  closeEddit(evt);
}

profileEdditButton.addEventListener('click',openEddit);
popupCloseButton.addEventListener('click', closeEddit);
popupForm.addEventListener('submit', submitEddit);
