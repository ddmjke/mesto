let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileInfo = profile.querySelector('.profile__description');
let profileEdditButton = profile.querySelector('.profile__eddit-button');

let popup = document.querySelector('.pop-up');
let popupSubmitButton = popup.querySelector('.pop-up__submit-button');
let popupCloseButton = popup.querySelector('.pop-up__close-button');
let popupInputs = popup.querySelectorAll('.pop-up__input')

function openEddit() {
  popupInputs[0].value = profileName.textContent;
  popupInputs[1].value = profileInfo.textContent;
  popup.classList.add('pop-up_active');
}
function closeEddit(evt) {
  evt.preventDefault(); 
  popup.classList.remove('pop-up_active');
}
function submitEddit(evt) {
  evt.preventDefault(); 
  profileName.textContent = popupInputs[0].value;
  profileInfo.textContent = popupInputs[1].value;
  popup.classList.remove('pop-up_active');
}

profileEdditButton.addEventListener('click',openEddit);
popupCloseButton.addEventListener('click', closeEddit);
popupSubmitButton.addEventListener('click', submitEddit)