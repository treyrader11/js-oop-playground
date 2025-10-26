// src/dom-mock/HTMLButtonElement.js
import HTMLElement from "./HTMLElement.js";

export default class HTMLButtonElement extends HTMLElement {
  constructor() {
    super("button");
    this.disabled = false;
  }

  click() {
    if (this.disabled) {
      console.log(`Button is disabled`);
      return;
    }
    console.log(`Button pressed: "${this.innerText}"`);
    if (this.onclick) this.onclick();
  }
}
