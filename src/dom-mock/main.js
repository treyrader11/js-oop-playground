// // src/dom-mock/main.js
// import mockDocument from "./index.js";
// import HTMLElement from "./HTMLElement.js";
// import HTMLDivElement from "./HTMLDivElement.js";
// import HTMLButtonElement from "./HTMLButtonElement.js";

// console.clear();

// /**
//  * Build a small mock DOM:
//  * <html>
//  *   <body>
//  *     <div id="app" class="container">
//  *       <div class="title">Hello Mock DOM</div>
//  *       <button>Click Me</button>
//  *     </div>
//  *   </body>
//  * </html>
//  */

// // Create root app container
// const app = mockDocument.createElement("div");
// app.id = "app";
// app.addClass?.("container");
// mockDocument.body.appendChild(app);

// // Title div
// const title = mockDocument.createElement("div");
// title.addClass?.("title");
// title.innerText = "Hello Mock DOM";
// app.appendChild(title);

// // Button
// const btn = mockDocument.createElement("button");
// btn.innerText = "Click Me";
// btn.onclick = () => console.log("mock click handler fired");
// app.appendChild(btn);

// // --- Output basic info -------------------------------------------------------
// console.log("Document:", mockDocument.toString());
// console.log("documentElement:", mockDocument.documentElement.toString?.());
// console.log("body:", mockDocument.body.toString?.());

// // Show element strings
// console.log("App ->", app.toString());
// console.log("Title ->", title.toString());
// console.log("Button ->", btn.toString());

// // --- Test inheritance (instanceof) ------------------------------------------
// console.log("\nINSTANCEOF CHECKS:");
// console.log(
//   "btn instanceof HTMLButtonElement:",
//   btn instanceof HTMLButtonElement
// ); // true
// console.log("btn instanceof HTMLElement:", btn instanceof HTMLElement); // true
// console.log("btn instanceof Object:", btn instanceof Object); // true

// console.log("app instanceof HTMLDivElement:", app instanceof HTMLDivElement); // true
// console.log("app instanceof HTMLElement:", app instanceof HTMLElement); // true

// // --- Simulate clicks ---------------------------------------------------------
// console.log("\nEVENTS:");
// btn.click(); // custom handler + button behavior
// app.click?.(); // HTMLElement base (DIV override logs text)

// // --- Queries -----------------------------------------------------------------
// console.log("\nQUERIES:");
// console.log("By id (#app):", mockDocument.getElementById("app")?.toString());
// console.log(
//   "By tag (div):",
//   mockDocument.querySelectorAll("div").map((n) => n.toString())
// );
// console.log(
//   "By class (.title):",
//   mockDocument.querySelector(".title")?.innerText
// );

// // --- Inspect prototype chain -------------------------------------------------
// console.log("\nPROTOTYPE CHAIN (button):");
// const p1 = Object.getPrototypeOf(btn);
// const p2 = Object.getPrototypeOf(p1);
// const p3 = Object.getPrototypeOf(p2);
// console.log("btn.__proto__                =", p1);
// console.log("btn.__proto__.__proto__      =", p2);
// console.log("btn.__proto__.__proto__.__proto__ =", p3);

// // --- Show the full mock DOM tree --------------------------------------------
// function showTree(node, depth = 0) {
//   const indent = "  ".repeat(depth);
//   const label = node.tagName
//     ? `<${node.tagName.toLowerCase()}>`
//     : node.toString();
//   console.log(indent + label);
//   node.childNodes.forEach((child) => showTree(child, depth + 1));
// }

// console.log("\nMOCK DOM TREE:");
// showTree(mockDocument.documentElement);

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
