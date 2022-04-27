import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  photoArray,
  profileEdditButton,
  photoAddButton,
} from '../utils/constants.js';

//============= validation
const formValidators = {}

const enableValidation = (keys) => {
  const forms = Array.from(document.querySelectorAll(keys.formSelector));
  forms.forEach(form => {
    const validator = new FormValidator(keys, form);
    formValidators[form.getAttribute('name')] = validator;
    validator.enable();
  });
}

enableValidation(
  {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit-button',
    inactiveButtonClass: 'pop-up__submit-button_inactive',
    inputErrorClass: 'pop-up__input_invalid',
    errorClass: 'pop-up__input-error_visable',
  }
);

//=============  functionality objects initialization

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
  validityHider: () => formValidators['user-info'].hideInputErrors(),
});

photoContainer.renderAll();
  
const addPopup = new PopupWithForm({
  selectorString:'.pop-up_type_place',
  submitHandler: (arg) => {photoContainer.addItem(arg)},
  validityHider: () => formValidators['place-form'].hideInputErrors(),
});

//============= listeners

photoAddButton.addEventListener('click', _ => addPopup.open());
profileEdditButton.addEventListener('click', _ => profilePopup.open())


