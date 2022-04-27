export default class FormValidator {
  constructor(keys, formElement) {
    this._keys = keys;
    this._form = formElement;
    this._inputs = Array.from(this._form.querySelectorAll(this._keys.inputSelector));
    this.hideInputErrors = this.hideInputErrors.bind(this);
  }
  
  enable() {
    const inputs = Array.from(this._form.querySelectorAll(this._keys.inputSelector));
    const button = this._form.querySelector(this._keys.submitButtonSelector);

    this._toggleButton(button, inputs);

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButton(button, inputs, true);
    });
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this._validateInput(input);
        this._toggleButton(button, inputs);
      })
    });
  }

  _toggleButton(button, inputs, forceDisable) {
    const condition = forceDisable || this._hasInvalidInputs(inputs);
    if (condition) {
      button.setAttribute('disabled', '');
      button.classList.add(this._keys.inactiveButtonClass);
    } else {
      button.removeAttribute('disabled');
      button.classList.remove(this._keys.inactiveButtonClass);
    }
  }

  _validateInput(input, forceValid) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    if (input.validity.valid || forceValid) {
      errorElement.classList.remove(this._keys.errorClass);
      input.classList.remove(this._keys.inputErrorClass);
    } else {
      errorElement.classList.add(this._keys.errorClass);
      errorElement.textContent = input.validationMessage;
      input.classList.add(this._keys.inputErrorClass);
    }
  }

  _hasInvalidInputs(inputs) {
    return inputs.some((input) => {return !input.validity.valid});
  }

  //============ public method to hide input errors when form just opened

  hideInputErrors() {
    this._inputs.forEach(input => this._validateInput(input, true));
  }
}