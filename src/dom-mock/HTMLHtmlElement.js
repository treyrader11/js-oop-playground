// src/dom-mock/HTMLHtmlElement.js
import HTMLElement from "./HTMLElement.js";

export default class HTMLHtmlElement extends HTMLElement {
  constructor() {
    super("html");
  }
}
