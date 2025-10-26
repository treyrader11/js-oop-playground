// src/dom-mock/HTMLElement.js
import Element from "./Element.js";

export default class HTMLElement extends Element {
  constructor(tagName) {
    super(tagName);
    this.style = {};
    this.innerText = "";
    this.id = "";
    this.classList = new Set();
  }

  set textContent(value) {
    this.innerText = String(value);
  }

  get textContent() {
    return this.innerText;
  }

  addClass(cls) {
    this.classList.add(cls);
  }

  removeClass(cls) {
    this.classList.delete(cls);
  }

  click() {
    console.log(`${this.tagName} clicked (base HTMLElement handler)`);
  }
}
