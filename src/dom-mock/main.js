// src/dom-mock/main.js
import HTMLDivElement from "./HTMLDivElement.js";
import HTMLButtonElement from "./HTMLButtonElement.js";

console.clear();

const div = new HTMLDivElement();
div.setAttribute("id", "root");
div.innerText = "I am a div!";

const button = new HTMLButtonElement();
button.innerText = "Click me!";
button.onclick = () => console.log("Custom click handler executed!");

div.appendChild(button);

console.log("Div ->", div.toString());
console.log("Button ->", button.toString());

// Test inheritance
console.log(button instanceof HTMLButtonElement); // true
console.log(button instanceof HTMLElement); // true
console.log(button instanceof Object); // true

// Simulate clicks
button.click();
div.click();

// Inspect prototype chain
console.log(Object.getPrototypeOf(button));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(button)));

// Show hierarchy
function showTree(node, depth = 0) {
  console.log("  ".repeat(depth) + node.toString());
  node.childNodes.forEach((child) => showTree(child, depth + 1));
}

console.log("\nDOM TREE:");
showTree(div);
