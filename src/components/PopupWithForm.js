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
    this._pending();
    return this._submitHandler(this._getInputValues())
      .then(() => this.close())
      .catch(err => this._setError(err))
      .finally(() => {
        this._pending();
      });
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
    this._setError();
    super.close();
  }

  _pending() {
    this._element.querySelector('.pop-up__submit-button').classList.toggle('pop-up__submit-button_pending');
  }

  _setError(err) {
    this._error = this._error || this._element.querySelector('.pop-up__network-error');
    this._error.textContent = err;
    if (err) this._error.classList.add('pop-up__network-error_visible')
      else  this._error.classList.remove('pop-up__network-error_visible');
  }
}