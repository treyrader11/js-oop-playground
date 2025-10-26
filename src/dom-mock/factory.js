// src/dom-mock/factory.js
import HTMLDivElement from "./HTMLDivElement.js";
import HTMLButtonElement from "./HTMLButtonElement.js";
import HTMLElement from "./HTMLElement.js";
import HTMLHtmlElement from "./HTMLHtmlElement.js";

const registry = new Map([
  ["html", HTMLHtmlElement],
  ["div", HTMLDivElement],
  ["button", HTMLButtonElement],
  // fallback for unknown tags -> generic HTMLElement(tag)
]);

export function registerElement(tag, Ctor) {
  registry.set(tag.toLowerCase(), Ctor);
}

export function createElementByTag(tag) {
  const t = String(tag).toLowerCase();
  const Ctor = registry.get(t);
  if (Ctor) return new Ctor();
  // Fallback: generic HTMLElement with the given tag name
  const el = new HTMLElement(t);
  return el;
}
