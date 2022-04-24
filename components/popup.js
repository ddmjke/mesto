class Popup {
  constructor(selectorString) {
    this._selector = selectorString;
    this._element = document.querySelector(this._selector);
    this._setEventListeners();
  }

  open() {
    this._element.classList.add('pop-up_active');
  }
  
  close() {
    this._element.classList.remove('pop-up_active');
  }

  _handleEscClose(event) {
    if (evt.key === 'Escape') {
      this._close(this._element);
    }
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    const button = this._element.querySelector('.pop-up__close-button');
    button.addEventListener('click', this._close);
  }
}

class PopupWithImage extends Popup {
  constructor(selectorString) {
    super(selectorString);
    this._image = this._element.querySelector('.pop-up__image');
    this._name = this._element.querySelector('.pop-up__image-caption');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
    Popup.open();
  }
}

class PopupWithForm extends Popup {
  constructor(selectorString, submitForm) {
    super(selectorString);
    this._submitFrom = submitForm;
  }

  _getInputValues(){
    //
    //-----WHAT?
    //
    inputs = Array.from(this._element.querySelectorAll('.pop-up__input'));
  }

  _setEventListeners(){
    //-----legal?
    Popup._setEventListeners();
    this._element.addEventListener('submit', submitForm);
  }
}