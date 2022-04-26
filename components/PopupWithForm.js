import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorString, submitHandler, inputsFiller}) {
    super(selectorString);
    this._submitHandler = submitHandler;
    this._inputsFiller = inputsFiller || '';
    this._inputs = document.querySelectorAll('.pop-up__input');
  }

  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    this._formValue = {};
    this._inputs.forEach(input => {
      this._formValue[input.id] = input.value;
    });
    return this._formValue;
  }
  

  //for form with fill method: forcing validation after setting new input values
  _setInputValues() {
    if (this._inputsFiller)
    {
      this._inputs.forEach(input => {
        input.value = this._inputsFiller()[input.id];
        input.dispatchEvent(new Event('input', {bubbles: true}));
      });
    } else {
      this._element.querySelector('.pop-up__form').reset();
    }
  }

  open() {
    this._setInputValues();
    super.open();
  }
}