// src/dom-mock/Node.js
export default class Node {
  constructor() {
    this.childNodes = [];
    this.parentNode = null;
  }

  appendChild(node) {
    this.childNodes.push(node);
    node.parentNode = this;
  }

  removeChild(node) {
    const idx = this.childNodes.indexOf(node);
    if (idx !== -1) {
      this.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  }

  get firstChild() {
    return this.childNodes[0] || null;
  }

  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }

  cloneNode(deep = false) {
    const clone = Object.create(this.constructor.prototype);
    Object.assign(clone, this);
    clone.childNodes = deep
      ? this.childNodes.map((c) => c.cloneNode(true))
      : [];
    return clone;
  }

  toString() {
    return `[Node: ${this.constructor.name}]`;
  }
}
