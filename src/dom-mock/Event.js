// src/dom-mock/Event.js
export const NONE = 0;
export const CAPTURING_PHASE = 1;
export const AT_TARGET = 2;
export const BUBBLING_PHASE = 3;

export default class Event {
  constructor(type, opts = {}) {
    this.type = String(type);
    this.bubbles = !!opts.bubbles;
    this.cancelable = !!opts.cancelable;

    this.target = null;
    this.currentTarget = null;
    this.eventPhase = NONE;

    this.defaultPrevented = false;
    this._immediateStopped = false;
    this._propagationStopped = false;
  }

  stopPropagation() {
    this._propagationStopped = true;
  }
  stopImmediatePropagation() {
    this._immediateStopped = true;
    this._propagationStopped = true;
  }
  preventDefault() {
    if (this.cancelable) this.defaultPrevented = true;
  }
}
