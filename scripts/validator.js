export default class Validator {
  constructor(keys, formElement) {
    this._keys = keys;
    this._form = formElement;
  }
  
  enable() {
    const inputs = Array.from(this._form.querySelectorAll(this._keys.inputSelector));
    const button = this._form.querySelector(this._keys.submitButtonSelector);

    this._toggleButton(button, inputs);

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      button.setAttribute('disabled','');
      button.classList.add(this._keys.inactiveButtonClass);
    });
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) => {
        this._validateInput(input);
        this._toggleButton(button, inputs);
      })
    });
  }

  _toggleButton(button, inputs) {
    if (this._hasInvalidInputs(inputs)) {
      button.setAttribute('disabled', '');
      button.classList.add(this._keys.inactiveButtonClass);
    } else {
      button.removeAttribute('disabled');
      button.classList.remove(this._keys.inactiveButtonClass);
    }
  }

  _validateInput(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
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
}