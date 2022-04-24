class Section {
  constructor({items, render}, containerSelectorString){
    this._items = items;
    this._render = render;
    this._selector = containerSelectorString;
  }

  renderAll() {
    this._items.forEach(element => {
      const nodeInstance = this._render(element);
      this.addItem(nodeInstance);
    });
  }

  addItem(elem) {
    document.querySelector(this._selector).append(elem);
  }
}