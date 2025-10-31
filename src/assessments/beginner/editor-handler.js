/**
 * Editor Handler for JavaScript Class & Inheritance Assessment
 * Handles code editing, saving, loading, and test execution
 */

document.addEventListener("DOMContentLoaded", function () {
  // Default code templates for each challenge
  const defaultCode = {
    1: `class Book {
  constructor(title, author, pages) {
    // Your code here
  }

  getInfo() {
    // Your code here
  }

  read() {
    // Your code here
  }
}`,
    2: `class BankAccount {
  #balance;

  constructor(accountHolder, initialBalance) {
    // Your code here
  }

  deposit(amount) {
    // Your code here
  }

  withdraw(amount) {
    // Your code here
  }

  getBalance() {
    // Your code here
  }
}`,
    3: `class Animal {
  constructor(name, species) {
    // Your code here
  }

  makeSound() {
    // Your code here
  }

  introduce() {
    // Your code here
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // Your code here
  }

  makeSound() {
    // Your code here
  }

  getBreed() {
    // Your code here
  }
}`,
    4: `class Vehicle {
  constructor(make, model, year) {
    // Your code here
  }

  getAge() {
    // Your code here
  }

  getInfo() {
    // Your code here
  }
}

class ElectricCar extends Vehicle {
  constructor(make, model, year, batteryCapacity) {
    // Your code here
  }

  getInfo() {
    // Your code here
  }

  getBatteryInfo() {
    // Your code here
  }
}`,
    5: `class Shape {
  constructor(name) {
    // Your code here
  }

  getArea() {
    // Your code here
  }

  getPerimeter() {
    // Your code here
  }

  describe() {
    // Your code here
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    // Your code here
  }

  getArea() {
    // Your code here
  }

  getPerimeter() {
    // Your code here
  }
}

class Square extends Rectangle {
  constructor(side) {
    // Your code here
  }

  describe() {
    // Your code here
  }
}`,
    bonus: `class Temperature {
  #celsius;

  constructor(celsius) {
    // Your code here
  }

  get celsius() {
    // Your code here
  }

  set celsius(value) {
    // Your code here
  }

  get fahrenheit() {
    // Your code here
  }

  set fahrenheit(value) {
    // Your code here
  }

  static freezingPoint() {
    // Your code here
  }

  static boilingPoint() {
    // Your code here
  }
}`,
  };

  // Load saved code from localStorage
  function loadSavedCode() {
    Object.keys(defaultCode).forEach((challenge) => {
      const editor = document.getElementById(`editor-${challenge}`);
      if (editor) {
        const saved = localStorage.getItem(`challenge-${challenge}`);
        if (saved) {
          editor.value = saved;
        }
      }
    });
  }

  // Save code to localStorage
  function saveCode(challenge, code) {
    localStorage.setItem(`challenge-${challenge}`, code);
  }

  // Auto-save on typing (with debounce)
  let saveTimeout;
  document.querySelectorAll(".code-editor").forEach((editor) => {
    editor.addEventListener("input", function () {
      const challenge = this.id.replace("editor-", "");
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveCode(challenge, this.value);
      }, 500);
    });

    // Handle Tab key for indentation
    editor.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value =
          this.value.substring(0, start) + "  " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 2;
      }
    });
  });

  // Reset button functionality
  document.querySelectorAll(".reset-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const challenge = this.getAttribute("data-challenge");
      const editor = document.getElementById(`editor-${challenge}`);
      if (editor && confirm("Are you sure you want to reset your code?")) {
        editor.value = defaultCode[challenge];
        saveCode(challenge, defaultCode[challenge]);
        const output = document.getElementById(`output-${challenge}`);
        if (output) {
          output.innerHTML = "";
        }
      }
    });
  });

  // Run tests functionality
  document.querySelectorAll(".run-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const challenge = this.getAttribute("data-challenge");
      const editor = document.getElementById(`editor-${challenge}`);
      const output = document.getElementById(`output-${challenge}`);

      if (!editor || !output) return;

      // Clear previous output
      output.innerHTML = '<div class="test-running">Running tests...</div>';

      // Small delay to show "Running tests..." message
      setTimeout(() => {
        const userCode = editor.value;
        const results = TestRunner.runTests(challenge, userCode);
        displayResults(output, results);
      }, 100);
    });
  });

  // Display test results
  function displayResults(outputElement, results) {
    const allPassed = results.every((r) => r.passed);
    const passedCount = results.filter((r) => r.passed).length;
    const totalCount = results.length;

    let html = `
      <div class="test-summary ${allPassed ? "all-passed" : "some-failed"}">
        <strong>${passedCount}/${totalCount} tests passed</strong>
        ${allPassed ? " 🎉" : ""}
      </div>
    `;

    results.forEach((result, index) => {
      html += `
        <div class="test-result ${result.passed ? "passed" : "failed"}">
          <div class="test-header">
            <span class="test-icon">${result.passed ? "✓" : "✗"}</span>
            <span class="test-name">${result.test}</span>
          </div>
          ${
            !result.passed
              ? `
            <div class="test-details">
              ${
                result.error
                  ? `
                <div class="test-error">Error: ${result.error}</div>
              `
                  : `
                <div class="test-expected">Expected: ${result.expected}</div>
                <div class="test-actual">Actual: ${JSON.stringify(
                  result.actual
                )}</div>
              `
              }
            </div>
          `
              : ""
          }
        </div>
      `;
    });

    outputElement.innerHTML = html;
  }

  // Load saved code on page load
  loadSavedCode();

  // Add a note about auto-save
  console.log("💾 Your code is automatically saved in the browser!");
});
