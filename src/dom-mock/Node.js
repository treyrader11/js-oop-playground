// src/dom-mock/Node.js
import { CAPTURING_PHASE, AT_TARGET, BUBBLING_PHASE } from "./Event.js";

export default class Node {
  constructor() {
    // Tree
    this.childNodes = [];
    this.parentNode = null;

    // EventTarget-ish
    // { [type: string]: Array<{listener: Function, capture: boolean}> }
    this._listeners = Object.create(null);
  }

  // ---------- Tree ops ----------
  appendChild(node) {
    this.childNodes.push(node);
    node.parentNode = this;
  }

  removeChild(node) {
    const idx = this.childNodes.indexOf(node);
    if (idx !== -1) {
      this.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  }

  get firstChild() {
    return this.childNodes[0] || null;
  }

  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null;
  }

  cloneNode(deep = false) {
    const clone = Object.create(this.constructor.prototype);
    Object.assign(clone, this);
    clone.childNodes = deep
      ? this.childNodes.map((c) => c.cloneNode(true))
      : [];
    // listeners are not cloned (like in real DOM)
    clone._listeners = Object.create(null);
    clone.parentNode = null;
    return clone;
  }

  // ---------- EventTarget-like API ----------
  addEventListener(type, listener, options = false) {
    const capture = !!(options && typeof options === "object"
      ? options.capture
      : options);
    const list = (this._listeners[type] ||= []);
    if (!list.some((l) => l.listener === listener && l.capture === capture)) {
      list.push({ listener, capture });
    }
  }

  removeEventListener(type, listener, options = false) {
    const capture = !!(options && typeof options === "object"
      ? options.capture
      : options);
    const list = this._listeners[type];
    if (!list) return;
    const idx = list.findIndex(
      (l) => l.listener === listener && l.capture === capture
    );
    if (idx >= 0) list.splice(idx, 1);
  }

  /**
   * Dispatches an event with 3 phases:
   *  - CAPTURE: root -> ... -> parent of target (capture listeners only)
   *  - AT_TARGET: target (capture then bubble listeners)
   *  - BUBBLE: parent of target -> ... -> root (bubble listeners only)
   * Honors stopPropagation/stopImmediatePropagation/preventDefault flags
   * (the flags are defined on the Event implementation).
   */
  dispatchEvent(event) {
    if (!event || !event.type) return false;

    // Build event path root -> ... -> target
    const path = [];
    let cur = this;
    while (cur) {
      path.unshift(cur);
      cur = cur.parentNode;
    }

    event.target = this;

    // CAPTURE
    for (let i = 0; i < path.length - 1; i++) {
      if (event._propagationStopped) break;
      event.eventPhase = CAPTURING_PHASE;
      event.currentTarget = path[i];
      path[i]._invokeListeners(event, /*capturePhase*/ true);
    }

    if (!event._propagationStopped) {
      // AT_TARGET
      event.eventPhase = AT_TARGET;
      event.currentTarget = this;
      // At target, browsers invoke capture then bubble listeners
      this._invokeListeners(event, /*capturePhase*/ true);
      if (!event._immediateStopped) {
        this._invokeListeners(event, /*capturePhase*/ false);
      }
    }

    // BUBBLE
    if (event.bubbles && !event._propagationStopped) {
      for (let i = path.length - 2; i >= 0; i--) {
        if (event._propagationStopped) break;
        event.eventPhase = BUBBLING_PHASE;
        event.currentTarget = path[i];
        path[i]._invokeListeners(event, /*capturePhase*/ false);
      }
    }

    event.eventPhase = 0;
    event.currentTarget = null;

    // true if not canceled
    return !event.defaultPrevented;
  }

  _invokeListeners(event, capturePhase) {
    const list = this._listeners[event.type];
    if (!list || !list.length) return;

    // Iterate over a copy in case the array is mutated during dispatch
    for (const { listener, capture } of [...list]) {
      if (event._immediateStopped) break;
      if (capture !== capturePhase) continue;
      try {
        listener.call(this, event);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Listener error:", err);
      }
    }
  }

  toString() {
    return `[Node: ${this.constructor.name}]`;
  }
}
