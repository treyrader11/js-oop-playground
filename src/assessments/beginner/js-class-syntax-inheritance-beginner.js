/**
 * ============================================
 * JAVASCRIPT CLASS & INHERITANCE ASSESSMENT
 * ============================================
 *
 * This assessment contains 5 challenges that progress from basic to intermediate.
 * Each challenge focuses on different aspects of JavaScript classes and inheritance.
 *
 * Instructions:
 * 1. Read each challenge description carefully
 * 2. Write your code in the designated area
 * 3. Run the test cases to verify your solution
 * 4. All test cases should pass before moving to the next challenge
 *
 * To run: node js-class-inheritance-assessment.js
 */

console.log("=== JavaScript Class & Inheritance Assessment ===\n");

// ============================================
// CHALLENGE 1: Basic Class Creation
// ============================================
/**
 * Create a class called 'Book' with the following:
 * - Constructor that accepts: title, author, pages
 * - A method called 'getInfo()' that returns a string:
 *   "Title by Author - Pages pages"
 * - A method called 'read()' that returns:
 *   "You are reading Title"
 */

// YOUR CODE HERE
class Book {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 1
console.log("Challenge 1: Basic Class Creation");
try {
  const book1 = new Book("1984", "George Orwell", 328);
  const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 310);

  console.assert(
    book1.getInfo() === "1984 by George Orwell - 328 pages",
    "Test 1.1 Failed"
  );
  console.assert(
    book2.getInfo() === "The Hobbit by J.R.R. Tolkien - 310 pages",
    "Test 1.2 Failed"
  );
  console.assert(book1.read() === "You are reading 1984", "Test 1.3 Failed");
  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 2: Class with Private Fields
// ============================================
/**
 * Create a class called 'BankAccount' with:
 * - A private field '#balance' (use # for private)
 * - Constructor that accepts: accountHolder, initialBalance
 * - Method 'deposit(amount)' - adds to balance, returns new balance
 * - Method 'withdraw(amount)' - subtracts from balance if sufficient funds
 *   Returns new balance, or "Insufficient funds" if amount > balance
 * - Method 'getBalance()' - returns current balance
 * - Property 'accountHolder' - stores the account holder name
 */

// YOUR CODE HERE
class BankAccount {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 2
console.log("Challenge 2: Class with Private Fields");
try {
  const account = new BankAccount("Alice", 1000);

  console.assert(account.getBalance() === 1000, "Test 2.1 Failed");
  console.assert(account.deposit(500) === 1500, "Test 2.2 Failed");
  console.assert(account.withdraw(200) === 1300, "Test 2.3 Failed");
  console.assert(
    account.withdraw(2000) === "Insufficient funds",
    "Test 2.4 Failed"
  );
  console.assert(account.accountHolder === "Alice", "Test 2.5 Failed");
  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 3: Basic Inheritance
// ============================================
/**
 * Create a parent class 'Animal' with:
 * - Constructor that accepts: name, species
 * - Method 'makeSound()' that returns "Some generic animal sound"
 * - Method 'introduce()' that returns "I am Name, a Species"
 *
 * Create a child class 'Dog' that extends Animal:
 * - Constructor that accepts: name, breed
 * - Should pass name and "Dog" as species to parent
 * - Override 'makeSound()' to return "Woof! Woof!"
 * - Add method 'getBreed()' that returns the breed
 */

// YOUR CODE HERE
class Animal {
  // Write your solution here
}

class Dog extends Animal {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 3
console.log("Challenge 3: Basic Inheritance");
try {
  const animal = new Animal("Generic", "Unknown");
  const dog = new Dog("Max", "Golden Retriever");

  console.assert(
    animal.makeSound() === "Some generic animal sound",
    "Test 3.1 Failed"
  );
  console.assert(
    animal.introduce() === "I am Generic, a Unknown",
    "Test 3.2 Failed"
  );
  console.assert(dog.makeSound() === "Woof! Woof!", "Test 3.3 Failed");
  console.assert(dog.introduce() === "I am Max, a Dog", "Test 3.4 Failed");
  console.assert(dog.getBreed() === "Golden Retriever", "Test 3.5 Failed");
  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 4: Inheritance with Super
// ============================================
/**
 * Create a parent class 'Vehicle' with:
 * - Constructor that accepts: make, model, year
 * - Method 'getAge()' that returns how many years old the vehicle is
 *   (current year is 2025)
 * - Method 'getInfo()' that returns "Year Make Model"
 *
 * Create a child class 'ElectricCar' that extends Vehicle:
 * - Constructor that accepts: make, model, year, batteryCapacity
 * - Call parent constructor using super()
 * - Override 'getInfo()' to return parent's getInfo() + " (Electric, BatteryCapacitykWh battery)"
 * - Add method 'getBatteryInfo()' that returns "Battery capacity: BatteryCapacitykWh"
 */

// YOUR CODE HERE
class Vehicle {
  // Write your solution here
}

class ElectricCar extends Vehicle {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 4
console.log("Challenge 4: Inheritance with Super");
try {
  const vehicle = new Vehicle("Toyota", "Camry", 2020);
  const electricCar = new ElectricCar("Tesla", "Model 3", 2023, 75);

  console.assert(vehicle.getAge() === 5, "Test 4.1 Failed");
  console.assert(vehicle.getInfo() === "2020 Toyota Camry", "Test 4.2 Failed");
  console.assert(electricCar.getAge() === 2, "Test 4.3 Failed");
  console.assert(
    electricCar.getInfo() === "2023 Tesla Model 3 (Electric, 75kWh battery)",
    "Test 4.4 Failed"
  );
  console.assert(
    electricCar.getBatteryInfo() === "Battery capacity: 75kWh",
    "Test 4.5 Failed"
  );
  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 5: Multi-Level Inheritance & Polymorphism
// ============================================
/**
 * Create a parent class 'Shape' with:
 * - Constructor that accepts: name
 * - Method 'getArea()' that returns 0 (to be overridden)
 * - Method 'getPerimeter()' that returns 0 (to be overridden)
 * - Method 'describe()' that returns "This is a Name with area Area and perimeter Perimeter"
 *   (where Area and Perimeter are calculated by calling the methods)
 *
 * Create a child class 'Rectangle' that extends Shape:
 * - Constructor that accepts: width, height
 * - Pass "Rectangle" to parent constructor
 * - Override 'getArea()' to return width * height
 * - Override 'getPerimeter()' to return 2 * (width + height)
 *
 * Create a grandchild class 'Square' that extends Rectangle:
 * - Constructor that accepts: side
 * - Pass side for both width and height to parent
 * - Override describe() to return "This is a Square with side Side, area Area and perimeter Perimeter"
 */

// YOUR CODE HERE
class Shape {
  // Write your solution here
}

class Rectangle extends Shape {
  // Write your solution here
}

class Square extends Rectangle {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 5
console.log("Challenge 5: Multi-Level Inheritance & Polymorphism");
try {
  const shape = new Shape("Generic Shape");
  const rectangle = new Rectangle(5, 10);
  const square = new Square(4);

  console.assert(shape.getArea() === 0, "Test 5.1 Failed");
  console.assert(shape.getPerimeter() === 0, "Test 5.2 Failed");
  console.assert(rectangle.getArea() === 50, "Test 5.3 Failed");
  console.assert(rectangle.getPerimeter() === 30, "Test 5.4 Failed");
  console.assert(
    rectangle.describe() ===
      "This is a Rectangle with area 50 and perimeter 30",
    "Test 5.5 Failed"
  );
  console.assert(square.getArea() === 16, "Test 5.6 Failed");
  console.assert(square.getPerimeter() === 16, "Test 5.7 Failed");
  console.assert(
    square.describe() ===
      "This is a Square with side 4, area 16 and perimeter 16",
    "Test 5.8 Failed"
  );
  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// BONUS CHALLENGE: Static Methods & Getters/Setters
// ============================================
/**
 * Create a class 'Temperature' with:
 * - Private field '#celsius'
 * - Constructor that accepts celsius temperature
 * - Getter 'celsius' that returns #celsius
 * - Setter 'celsius' that sets #celsius (must be >= -273.15, absolute zero)
 * - Getter 'fahrenheit' that returns celsius converted to fahrenheit: (C * 9/5) + 32
 * - Setter 'fahrenheit' that converts fahrenheit to celsius and sets it: (F - 32) * 5/9
 * - Static method 'freezingPoint()' that returns a new Temperature instance at 0°C
 * - Static method 'boilingPoint()' that returns a new Temperature instance at 100°C
 */

// YOUR CODE HERE
class Temperature {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Bonus Challenge
console.log("BONUS Challenge: Static Methods & Getters/Setters");
try {
  const temp = new Temperature(25);

  console.assert(temp.celsius === 25, "Test B.1 Failed");
  console.assert(temp.fahrenheit === 77, "Test B.2 Failed");

  temp.celsius = 0;
  console.assert(temp.fahrenheit === 32, "Test B.3 Failed");

  temp.fahrenheit = 212;
  console.assert(temp.celsius === 100, "Test B.4 Failed");

  const freezing = Temperature.freezingPoint();
  const boiling = Temperature.boilingPoint();
  console.assert(freezing.celsius === 0, "Test B.5 Failed");
  console.assert(boiling.celsius === 100, "Test B.6 Failed");

  // Test absolute zero limit
  try {
    temp.celsius = -300;
    console.log(
      "✗ Test B.7 Failed - Should not allow temperature below absolute zero"
    );
  } catch (e) {
    console.assert(true, "Test B.7 Passed");
  }

  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

console.log("=== Assessment Complete ===");
console.log("\nTips for improving:");
console.log("- Remember to use 'constructor' keyword for class constructors");
console.log("- Use 'super()' to call parent constructor in child classes");
console.log(
  "- Private fields start with # and must be declared at class level"
);
console.log("- Use 'extends' keyword for inheritance");
console.log("- Use 'static' keyword for class-level methods");
console.log(
  "- Getters/setters use 'get' and 'set' keywords before method name"
);
