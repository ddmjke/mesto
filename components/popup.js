export default class Popup {
  constructor(selectorString) {
    this._selector = selectorString;
    this._element = document.querySelector(this._selector);
    this._handleClick = this._handleClick.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('pop-up_active');
    this._setEventListeners();
  }
  
  close() {
    this._element.classList.remove('pop-up_active');
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClick(evt) {
    if (evt.target.classList.contains('pop-up')
        || evt.target.classList.contains('pop-up__close-button'))this.close();
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._element.addEventListener('click', this._handleClick);
  }
  
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._element.removeEventListener('click', this._handleClick);
  }
}