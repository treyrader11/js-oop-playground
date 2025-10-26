// src/dom-mock/HTMLElement.js
import Element from "./Element.js";
import Event from "./Event.js";

class ClassListSet extends Set {
  add(...classes) {
    classes.forEach((c) => super.add(String(c)));
    return this;
  }
  remove(...classes) {
    classes.forEach((c) => super.delete(String(c)));
  }
  toggle(token, force) {
    const c = String(token);
    if (force === true) {
      this.add(c);
      return true;
    }
    if (force === false) {
      this.delete(c);
      return false;
    }
    if (this.has(c)) {
      this.delete(c);
      return false;
    }
    this.add(c);
    return true;
  }
  contains(token) {
    return this.has(String(token));
  }
  get value() {
    return Array.from(this).join(" ");
  }
}

export default class HTMLElement extends Element {
  constructor(tagName) {
    super(tagName);
    this.style = {};
    this.innerText = ""; // legacy convenience
    this.id = "";
    this.classList = new ClassListSet();

    // Legacy property handler
    this.onclick = null;
  }

  // If children exist, aggregate their text (like real DOM).
  // Otherwise fall back to legacy innerText.
  get textContent() {
    if (this.childNodes && this.childNodes.length) {
      return this.childNodes
        .map((n) => (typeof n.textContent === "string" ? n.textContent : ""))
        .join("");
    }
    return this.innerText;
  }

  // Setting textContent clears children and sets innerText for simplicity.
  set textContent(value) {
    this.childNodes.length = 0;
    this.innerText = String(value);
  }

  addClass(cls) {
    this.classList.add(cls);
  }
  removeClass(cls) {
    this.classList.remove(cls);
  }

  /**
   * In the mock, click() triggers:
   *  - the on* property handler (if provided)
   *  - a bubbling, cancelable "click" Event
   */
  click() {
    if (typeof this.onclick === "function") {
      try {
        this.onclick();
      } catch (e) {
        console.error(e);
      }
    }
    const evt = new Event("click", { bubbles: true, cancelable: true });
    this.dispatchEvent(evt);
  }
}
