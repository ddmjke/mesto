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
    const args = this._getInputValues() || this._id;
    return this._submitHandler(args)
      .then(() => this.close())
      .catch(err => this._setError(err))
      .finally(() => {
        this._pending();
        this._validityHider();
      });
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._element.removeEventListener('submit', this._submitHandleFunction);
  }

  _getInputValues() {
    this._formValue = this._formValue || {};
    let hasValue = false;
    this._inputs.forEach(input => {
      this._formValue[input.id] = input.value;
      hasValue = true;
    });
    return hasValue? this._formValue : hasValue;
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
    this._form.querySelector('.pop-up__submit-button').classList.toggle('pop-up__submit-button_pending');
  }

  _setError(err) {
    this._error = this._error || this._element.querySelector('.pop-up__network-error');
    this._error.textContent = err;
    if (err) this._error.classList.add('pop-up__network-error_visible')
      else  this._error.classList.remove('pop-up__network-error_visible');
  }

  deleteCard(id) {
    this._id = id;
    this.open();
    return new Promise(resolve => {
      this._element.addEventListener('submit', () => resolve());
    })
  }
}