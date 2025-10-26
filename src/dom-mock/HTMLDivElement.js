// src/dom-mock/HTMLDivElement.js
import HTMLElement from "./HTMLElement.js";

export default class HTMLDivElement extends HTMLElement {
  constructor() {
    super("div");
  }

  click() {
    console.log(`DIV clicked: innerText="${this.innerText}"`);
  }
}
