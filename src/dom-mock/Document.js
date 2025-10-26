import Node from "./Node.js";
import { createElementByTag } from "./factory.js";
import HTMLHtmlElement from "./HTMLHtmlElement.js";
import HTMLElement from "./HTMLElement.js";
import Text from "./Text.js";

export default class Document extends Node {
  constructor() {
    super();
    this.documentElement = new HTMLHtmlElement();
    this.body = new HTMLElement("body");
    this.documentElement.appendChild(this.body);
  }

  createElement(tagName) {
    return createElementByTag(tagName);
  }

  createTextNode(data) {
    return new Text(data);
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all[0] || null;
  }

  querySelectorAll(selector) {
    const results = [];
    const [type, value] = this.#parseSelector(selector);
    this.#walk(this.documentElement, (node) => {
      if (!(node instanceof HTMLElement)) return;
      switch (type) {
        case "id":
          if (node.id === value) results.push(node);
          break;
        case "class":
          if (node.classList && node.classList.has(value)) results.push(node);
          break;
        case "tag":
          if (node.tagName.toLowerCase() === value) results.push(node);
          break;
      }
    });
    return results;
  }

  getElementById(id) {
    return this.querySelector(`#${id}`);
  }

  #parseSelector(sel) {
    const s = String(sel).trim();
    if (s.startsWith("#")) return ["id", s.slice(1)];
    if (s.startsWith(".")) return ["class", s.slice(1)];
    return ["tag", s.toLowerCase()];
  }

  #walk(node, visit) {
    visit(node);
    for (const child of node.childNodes) this.#walk(child, visit);
  }

  toString() {
    return `#document`;
  }
}
