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