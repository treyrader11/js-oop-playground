// src/dom-mock/render.js
import HTMLElement from "./HTMLElement.js";
import Text from "./Text.js";

function attrsToString(el) {
  const parts = [];
  if (el.id) parts.push(`id="${el.id}"`);

  // classList
  if (el.classList && el.classList.size) {
    parts.push(`class="${Array.from(el.classList).join(" ")}"`);
  }

  // style
  if (el.style && Object.keys(el.style).length) {
    const css = Object.entries(el.style)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    parts.push(`style="${css}"`);
  }

  // other attributes
  for (const [k, v] of Object.entries(el.attributes || {})) {
    if (k === "id") continue;
    parts.push(`${k}="${v}"`);
  }

  return parts.length ? " " + parts.join(" ") : "";
}

export function toHTML(node) {
  if (node instanceof Text) {
    // naive escape
    return node.data.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }
  if (node instanceof HTMLElement) {
    const open = `<${node.tagName.toLowerCase()}${attrsToString(node)}>`;
    const children = node.childNodes.map(toHTML).join("");
    const text = node.innerText && !children ? node.innerText : "";
    const close = `</${node.tagName.toLowerCase()}>`;
    return open + text + children + close;
  }
  // Fallback for non-HTMLElement nodes
  return node.childNodes?.map(toHTML).join("") ?? "";
}
