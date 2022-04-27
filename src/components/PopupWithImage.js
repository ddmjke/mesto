import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorString) {
    super(selectorString);
    this._image = this._element.querySelector('.pop-up__image');
    this._name = this._element.querySelector('.pop-up__image-caption');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
    super.open();
  }
}