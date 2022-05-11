import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selectorString, submitHandler, inputsFiller, validityHider}) {
    super(selectorString);
    this._submitHandler = submitHandler;
    this._inputsFiller = inputsFiller || '';
    this._validityHider = validityHider;
    this._inputs = this._element.querySelectorAll('.pop-up__input');
    this._form = this._element.querySelector('.pop-up__form');

    this._submitHandleFunction = this._submitHandleFunction.bind(this);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener('submit', this._submitHandleFunction);
  }

  _submitHandleFunction(evt) {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
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
  

  _setInputValues() {
    if (this._inputsFiller)
    {
      this._inputs.forEach(input => {
        input.value = this._inputsFiller()[input.id];
      });
    }
  }

  open() {
    this._setInputValues();
    this._validityHider();
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  pending() {
    this._form.querySelector('.pop-up__submit-button').classList.toggle('pop-up__submit-button_pending');
  }
}