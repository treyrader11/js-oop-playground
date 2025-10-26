// src/dom-mock/DocumentFragment.js
import Node from "./Node.js";

export default class DocumentFragment extends Node {
  constructor() {
    super();
  }

  toString() {
    return `#document-fragment`;
  }
}
