import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorString, submitHandler, inputsFiller}) {
    super(selectorString);
    this._submitHandler = submitHandler;
    this._inputsFiller = inputsFiller || '';
    this._inputs = this._element.querySelectorAll('.pop-up__input');

    this._submitHandleFunction = this._submitHandleFunction.bind(this);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener('submit', this._submitHandleFunction);
  }

  _submitHandleFunction(evt) {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    this.close();
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._element.removeEventListener('submit', this._submitHandleFunction);
  }

  _getInputValues() {
    this._formValue = this._formValue || {};
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