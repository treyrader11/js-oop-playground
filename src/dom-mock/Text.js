import Node from "./Node.js";

export default class Text extends Node {
  constructor(data = "") {
    super();
    this.data = String(data);
  }
  get nodeType() {
    return 3;
  } // #text
  get textContent() {
    return this.data;
  }
  set textContent(v) {
    this.data = String(v);
  }
  toString() {
    return `#text "${this.data}"`;
  }
}
