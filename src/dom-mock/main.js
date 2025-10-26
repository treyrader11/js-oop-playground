// src/dom-mock/main.js
import mockDocument from "./index.js";
import HTMLElement from "./HTMLElement.js";
import HTMLDivElement from "./HTMLDivElement.js";
import HTMLButtonElement from "./HTMLButtonElement.js";
import Event, { CAPTURING_PHASE, AT_TARGET, BUBBLING_PHASE } from "./Event.js";
import { toHTML } from "./render.js";

console.clear();

/**
 * Build:
 * <html>
 *   <body>
 *     <div id="app" class="container">
 *       <div class="title">Hello Mock DOM</div>
 *       <button>Click Me</button>
 *     </div>
 *   </body>
 * </html>
 */

// app container
const app = mockDocument.createElement("div");
app.id = "app";
app.addClass?.("container");
mockDocument.body.appendChild(app);

// title with Text node
const title = mockDocument.createElement("div");
title.addClass?.("title");
title.appendChild(mockDocument.createTextNode("Hello "));
title.appendChild(mockDocument.createTextNode("Mock DOM"));
app.appendChild(title);

// button
const btn = mockDocument.createElement("button");
btn.appendChild(mockDocument.createTextNode("Click Me"));
app.appendChild(btn);

// -------- Event listeners (capture/target/bubble) -----------------
function phaseName(p) {
  return p === CAPTURING_PHASE
    ? "capture"
    : p === AT_TARGET
    ? "target"
    : p === BUBBLING_PHASE
    ? "bubble"
    : "none";
}

// Capture on app
app.addEventListener(
  "click",
  (e) => {
    console.log(`[app] ${phaseName(e.eventPhase)}: capturing listener`);
  },
  { capture: true }
);

// Bubble on app
app.addEventListener("click", (e) => {
  console.log(`[app] ${phaseName(e.eventPhase)}: bubbling listener`);
});

// Target handlers on button
btn.addEventListener("click", (e) => {
  console.log(`[button] ${phaseName(e.eventPhase)}: first target listener`);
});

btn.addEventListener("click", (e) => {
  console.log(
    `[button] ${phaseName(
      e.eventPhase
    )}: second target listener (stopping propagation)`
  );
  e.stopPropagation(); // prevents bubbling to app bubbling listener
});

// Legacy on* property (fires before dispatch in our mock's click())
btn.onclick = () => console.log(`[button] onclick property fired`);

// -------- Simulate a click ----------------------------------------
console.log("\n=== DISPATCH: btn.click() ===");
btn.click();

// -------- Instanceof checks ---------------------------------------
console.log("\nINSTANCEOF:");
console.log(
  "btn instanceof HTMLButtonElement:",
  btn instanceof HTMLButtonElement
);
console.log("btn instanceof HTMLElement:", btn instanceof HTMLElement);
console.log("app instanceof HTMLDivElement:", app instanceof HTMLDivElement);

// -------- Render to HTML-like string -------------------------------
console.log("\nRENDERED HTML:");
console.log(toHTML(mockDocument.documentElement));

// -------- Show tree (with node labels) -----------------------------
function showTree(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const label = node.tagName
    ? `<${node.tagName.toLowerCase()}>`
    : node.toString();
  console.log(indent + label);
  node.childNodes.forEach((c) => showTree(c, depth + 1));
}

console.log("\nMOCK DOM TREE:");
showTree(mockDocument.documentElement);
