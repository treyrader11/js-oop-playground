// src/dom-mock/ui.js
import mockDocument from "./index.js";
import HTMLElement from "./HTMLElement.js";
import HTMLDivElement from "./HTMLDivElement.js";
import HTMLButtonElement from "./HTMLButtonElement.js";
import Event, { CAPTURING_PHASE, AT_TARGET, BUBBLING_PHASE } from "./Event.js";
import { toHTML } from "./render.js";

const el = (s) => document.querySelector(s);
const logEl = el("#log");

const phaseName = (p) =>
  p === CAPTURING_PHASE
    ? "capture"
    : p === AT_TARGET
    ? "target"
    : p === BUBBLING_PHASE
    ? "bubble"
    : "none";

function log(line) {
  logEl.textContent += line + "\n";
  logEl.scrollTop = logEl.scrollHeight;
}

// ---- Build the mock DOM tree (same shape you had) -----------------
const app = mockDocument.createElement("div");
app.id = "app";
app.addClass?.("container");
mockDocument.body.appendChild(app);

const title = mockDocument.createElement("div");
title.addClass?.("title");
// Use Text nodes to practice
title.appendChild(mockDocument.createTextNode("Hello "));
title.appendChild(mockDocument.createTextNode("Mock DOM"));
app.appendChild(title);

const btn = mockDocument.createElement("button");
btn.appendChild(mockDocument.createTextNode("Click Me"));
app.appendChild(btn);

// ---- Event listeners (capture/target/bubble) ----------------------
app.addEventListener(
  "click",
  (e) => {
    log(`[app] ${phaseName(e.eventPhase)}: capturing listener`);
  },
  { capture: true }
);

app.addEventListener("click", (e) => {
  log(`[app] ${phaseName(e.eventPhase)}: bubbling listener`);
});

btn.addEventListener("click", (e) => {
  log(`[button] ${phaseName(e.eventPhase)}: first target listener`);
});

btn.addEventListener("click", (e) => {
  log(
    `[button] ${phaseName(
      e.eventPhase
    )}: second target listener (stopping propagation)`
  );
  e.stopPropagation();
});

// Legacy property
btn.onclick = () => log(`[button] onclick property fired`);

// ---- Renderers ----------------------------------------------------
function renderTree(node, depth = 0, out = []) {
  const indent = "  ".repeat(depth);
  const label = node.tagName
    ? `<${node.tagName.toLowerCase()}>`
    : node.toString();
  out.push(indent + label);
  node.childNodes.forEach((c) => renderTree(c, depth + 1, out));
  return out.join("\n");
}

function refreshPanels() {
  el("#tree").textContent = renderTree(mockDocument.documentElement);
  el("#html").textContent = toHTML(mockDocument.documentElement);
}

// ---- Controls -----------------------------------------------------
el("#simulate-click").addEventListener("click", () => {
  log(`\n=== DISPATCH: btn.click() ===`);
  btn.click();
  refreshPanels();
});

el("#toggle-title-class").addEventListener("click", () => {
  title.classList.toggle("active");
  log(`Toggled .active on .title → classList="${title.classList.value}"`);
  refreshPanels();
});

el("#apply-title-text").addEventListener("click", () => {
  const v = el("#title-input").value ?? "";
  // For demo: replace children and set new text via textContent
  title.textContent = v;
  log(`Set title textContent="${v}"`);
  refreshPanels();
});

el("#clear-log").addEventListener("click", () => (logEl.textContent = ""));

// initial paint
refreshPanels();

// Sanity logs (optional, comment out if noisy)
console.log(
  "btn instanceof HTMLButtonElement:",
  btn instanceof HTMLButtonElement
);
console.log("btn instanceof HTMLElement:", btn instanceof HTMLElement);
console.log("app instanceof HTMLDivElement:", app instanceof HTMLDivElement);
