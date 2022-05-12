import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor({selectorString, submitHandler}){
    super(selectorString);
    this._submitHandler = submitHandler;

    this._inputs = this._element.querySelectorAll('.pop-up__input');
    this._form = this._element.querySelector('.pop-up__form');
    this._submitHandleFunction = this._submitHandleFunction.bind(this);
    this.setDeleteFunction = this.setDeleteFunction.bind(this);
  }
  
  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener('submit', this._submitHandleFunction);
  }
  
  _removeEventListeners() {
    super._removeEventListeners();
    this._element.removeEventListener('submit', this._submitHandleFunction);
  }

  _submitHandleFunction(evt) {
    evt.preventDefault();
    this._pending();
    return this._submitHandler(this._id)
      .then(() => {
        this._deleteFunction();
        this.close();
      })
      .catch(err => this._setError(err))
      .finally(() => {
        this._pending();
    });
  }
  
  setDeleteFunction(id, func) {
    this._id = id;
    this._deleteFunction = func;
    super.open();
  }

  close() {
    this._id = '';
    this._deleteFunction = '';
    super.close();
  }

  _pending() {
    this._form.querySelector('.pop-up__submit-button').classList.toggle('pop-up__submit-button_pending');
  }

  _setError(err) {
    const errElement = this._element.querySelector('.pop-up__network-error');
    errElement.textContent = err;
    if (err) errElement.classList.add('pop-up__network-error_visible')
      else  errElement.remove('pop-up__network-error_visible');
  }

}