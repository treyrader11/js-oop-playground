// src/dom-mock/HTMLButtonElement.js
import HTMLElement from "./HTMLElement.js";

export default class HTMLButtonElement extends HTMLElement {
  constructor() {
    super("button");
    this.disabled = false;
  }

  click() {
    if (this.disabled) {
      console.log("Button is disabled");
      return;
    }

    // Prefer aggregated text from children; fall back to innerText
    const label = this.textContent || this.innerText || "";
    console.log(`Button pressed: "${label}"`);

    // Let HTMLElement handle onclick + dispatchEvent (capture → target → bubble)
    super.click();
  }
}
