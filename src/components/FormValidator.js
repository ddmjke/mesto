export default class FormValidator {
  constructor(keys, formElement) {
    this._keys = keys;
    this._form = formElement;
    this._button = this._form.querySelector(this._keys.submitButtonSelector);
    this._inputs = [];
    const inputarray = Array.from(this._form.querySelectorAll(this._keys.inputSelector));
    inputarray.forEach(input => {
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      this._inputs.push({input: input, errorElement: errorElement});
    });
  }
  
  enable() {
    this._toggleButton();
    this._setListeners();
  }
  
  _setListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButton(true);
    });
    this._inputs.forEach((pair) => {
      pair.input.addEventListener('input', (evt) => {
        this._validateInput(pair);
        this._toggleButton();
      })
    });
  }

  _toggleButton(forceDisable) {
    if (this._hasInvalidInputs() || forceDisable) {
      this._button.setAttribute('disabled', '');
      this._button.classList.add(this._keys.inactiveButtonClass);
    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._keys.inactiveButtonClass);
    }
  }

  _validateInput(pair, forceValid) {
    if (pair.input.validity.valid || forceValid) {
      pair.errorElement.classList.remove(this._keys.errorClass);
      pair.input.classList.remove(this._keys.inputErrorClass);
    } else {
      pair.errorElement.classList.add(this._keys.errorClass);
      pair.errorElement.textContent = pair.input.validationMessage;
      pair.input.classList.add(this._keys.inputErrorClass);
    }
  }

  _hasInvalidInputs() {
    return this._inputs.some((pair) => {return !pair.input.validity.valid});
  }

  //============ public method to hide input errors when form just opened

  hideInputErrors() {
    this._inputs.forEach(input => this._validateInput(input, true));
  }
}