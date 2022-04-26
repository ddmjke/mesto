export default class Section {
  constructor({items, render}, containerSelectorString){
    this._items = items;
    this._render = render;
    this._container = document.querySelector(containerSelectorString);
  }

  renderAll() {
    this._items.forEach(element => this.addItem(element));
  }

  addItem(elem) {
    const nodeInstance = this._render(elem);
    this._container.prepend(nodeInstance);
  }
}