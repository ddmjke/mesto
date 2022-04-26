import Card from "../components/card.js";
import FormValidator from "../components/validator.js";
import Section from '../components/section.js'
import UserInfo from '../components/userinfo.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {photoArray} from "../utils/constants.js";
import {profile,
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
} from '../utils/constants.js';

const profileObject = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
});

const photoContainer = new Section(
  {
    items: photoArray,
    render: (photo) => {
      const card = new Card(
        {
          name: photo.name,
          link: photo.link,
          handleClick: () => {photoPopup.open(photo.link, photo.name)},
        },
        '.photo-grid__card');
        return card.generateCard();
      }
  },
  '.photo-grid'
);

const photoPopup = new PopupWithImage('.pop-up_type_photo');

const profilePopup = new PopupWithForm({
  selectorString:'.pop-up_type_profile',
  submitHandler: profileObject.setUserInfo,
  inputsFiller: profileObject.getUserInfo,
});

photoContainer.renderAll();
  
const addPopup = new PopupWithForm({
  selectorString:'.pop-up_type_place',
  submitHandler: (arg) => {photoContainer.addItem(arg)},
});

//============= listeners

photoAddButton.addEventListener('click', _ => addPopup.open());
profileEdditButton.addEventListener('click', _ => profilePopup.open())


//============= validation
function enableValidation(keys, forms) {
  forms.forEach((form) => {
    const validator = new FormValidator(keys, form);
    validator.enable();
  })
}

enableValidation(
  {
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit-button',
    inactiveButtonClass: 'pop-up__submit-button_inactive',
    inputErrorClass: 'pop-up__input_invalid',
    errorClass: 'pop-up__input-error_visable',
  },
  forms
);
