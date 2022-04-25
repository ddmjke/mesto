import Card from "./card.js";

export default class Section {
  constructor({items, render}, containerSelectorString){
    this._items = items;
    this._render = render;
    this._container = document.querySelector(containerSelectorString);
  }

  renderAll() {
    this._items.forEach(element => {
      const nodeInstance = this._render(element);
      this.addItem(nodeInstance);
    });
  }

  addItem(elem) {
    this._container.append(elem);
  }
}