export default class Section {
  constructor({items, render}, containerSelectorString){
    this._items = [];
    this._render = render;
    this._container = document.querySelector(containerSelectorString);
    this.renderAll(items);
  }

  renderAll(items) {
    if (items) this._items.push(...items);
    this._items.forEach(element => this.addItem(element));
  }

  addItem(arg) {
    const nodeInstance = this._render(arg);
    this._container.prepend(nodeInstance);
  }
}