// src/dom-mock/Element.js
import Node from "./Node.js";

export default class Element extends Node {
  constructor(tagName) {
    super();
    this.tagName = tagName.toUpperCase();
    this.attributes = {};
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name] ?? null;
  }

  hasAttribute(name) {
    return Object.hasOwn(this.attributes, name);
  }

  removeAttribute(name) {
    delete this.attributes[name];
  }

  toString() {
    return `<${this.tagName}>`;
  }
}
