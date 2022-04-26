export default class SubmitForm {
  constructor({formSelector, handleSubmit}) {
    this._formSelector = formSelector;
    this._handleSubmit = handleSubmit;
  }

  generateForm() {
    this._element = this._getElement();
    this._setEventListeners();
    return this._element;
  }

  _getElement() {
    const element = document
      .querySelector(this._selector)
      .content
      .querySelector('.form')
      .cloneNode(true);
    return element;
  }

  _setEventListeners() {
    this._element.addEventListener('submit', () => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this._element.reset();
    });
  }

  _getInputValues() {
    this._inputs = this._element.querySelectorAll('.pop-up__input');
    this._formValue = {};
    this._inputs.forEach(element => {
      this._formValue[element.name] = element.value;
    });
    return this._formValue;
  }
}