import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  profileEdditButton,
  photoAddButton,
  proileAvatarButton
} from '../utils/constants.js';
import Api from '../components/Api';
import PopupWithSubmit from '../components/PopupWithSubmit';

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
const mestoApi = new Api({
  coghortUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  //dear github followers please dont tell anyone this:
  token: 'd4112968-6ba1-4a40-975c-b5c593c09b3a',
});

const profileObject = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
  picSelector: '.profile__avatar',
  setInfo: mestoApi.setUser,
  setAvatar: mestoApi.setAvatar,  
});

const photoContainer = new Section(
  {
    render: (photo) => {
      const card = new Card(
        {
          name: photo.name,
          link: photo.link,
          likes: photo.likes.length,
          isLiked: photo.likes.some(user => mestoApi.isMe(user)),
          isSalfe: mestoApi.isMe(photo.owner),
          cardId: photo._id,
          toggleLike: mestoApi.toggleLike,
          handleClick: () => {photoPopup.open(photo.link, photo.name)},
          handleDelete: confirmPopup.setDeleteFunction, 
        },
        '.photo-grid__card');
      return card.generateCard();
    }
  },
  '.photo-grid'
);

//=========== initial info load

Promise.all([mestoApi.getUser(), mestoApi.getCards()])
  .then(([info, cards]) => {
    profileObject.renderInfo(info);
    photoContainer.renderAll(cards);
  })
  .catch(err => console.log(`Failed to load initial info : ${err}`));

    
//========== pop-ups initialization

const photoPopup = new PopupWithImage('.pop-up_type_photo');

const confirmPopup = new PopupWithSubmit({
  selectorString: '.pop-up_type_confirm',
  submitHandler: (arg) => {return mestoApi.deleteCard(arg)},
})

const profilePopup = new PopupWithForm({
  selectorString:'.pop-up_type_profile',
  submitHandler: profileObject.setUserInfo,
  inputsFiller: profileObject.getUserInfo,
  validityHider: () => formValidators['user-info'].hideInputErrors(),
});

const avatarPopup = new PopupWithForm({
  selectorString: '.pop-up_type_avatar',
  submitHandler: profileObject.setUserInfo,
  validityHider: () => formValidators['user-pic'].hideInputErrors(),
});
  
const addPopup = new PopupWithForm({
  selectorString:'.pop-up_type_place',
  submitHandler: (args) => {
    return mestoApi.setCard(args)
      .then(res => {
        photoContainer.addItem(res);
        return Promise.resolve()
      });
  },
  validityHider: () => formValidators['place-form'].hideInputErrors(),
});

//============= static listeners

photoAddButton.addEventListener('click', () => addPopup.open());
profileEdditButton.addEventListener('click', () => profilePopup.open());
proileAvatarButton.addEventListener('click', () => avatarPopup.open());





