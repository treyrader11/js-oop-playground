# JavaScript Classes and Inheritance: Comprehensive Study Guide

## Table of Contents

1. [Introduction to Classes](#introduction-to-classes)
2. [Class Basics](#class-basics)
3. [Constructor Methods](#constructor-methods)
4. [Class Methods](#class-methods)
5. [Getters and Setters](#getters-and-setters)
6. [Static Methods and Properties](#static-methods-and-properties)
7. [Inheritance with extends](#inheritance-with-extends)
8. [The super Keyword](#the-super-keyword)
9. [Method Overriding](#method-overriding)
10. [Private Fields and Methods](#private-fields-and-methods)
11. [Class Expressions](#class-expressions)
12. [Prototype Chain](#prototype-chain)
13. [Best Practices](#best-practices)
14. [Common Patterns](#common-patterns)
15. [Practice Exercises](#practice-exercises)

---

## Introduction to Classes

JavaScript classes, introduced in ES6 (2015), provide a cleaner and more intuitive syntax for creating objects and implementing inheritance. While they're syntactic sugar over JavaScript's existing prototype-based inheritance, they make object-oriented programming more accessible.

**Key Points:**

- Classes are templates for creating objects
- They encapsulate data and behavior
- They use prototype-based inheritance under the hood
- Class syntax is more familiar to developers from other OOP languages

---

## Class Basics

### Defining a Class

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

// Creating instances
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

person1.greet(); // "Hello, my name is Alice"
```

**Important Notes:**

- Class names conventionally start with a capital letter
- You must use the `new` keyword to create instances
- Classes are NOT hoisted (unlike function declarations)
- Classes execute in strict mode by default

### Class vs Function Constructor

```javascript
// Old way (function constructor)
function PersonOld(name, age) {
  this.name = name;
  this.age = age;
}

PersonOld.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

// Modern way (class)
class PersonNew {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

---

## Constructor Methods

The constructor is a special method that runs when you create a new instance of a class.

### Basic Constructor

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.width); // 10
console.log(rect.height); // 5
```

### Constructor with Validation

```javascript
class BankAccount {
  constructor(accountNumber, initialBalance) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }
}

// This will throw an error
// const account = new BankAccount('123', -100);
```

### Default Parameters in Constructor

```javascript
class User {
  constructor(username, role = "user") {
    this.username = username;
    this.role = role;
  }
}

const user1 = new User("alice"); // role: 'user'
const user2 = new User("bob", "admin"); // role: 'admin'
```

---

## Class Methods

Methods are functions defined inside a class that operate on instance data.

### Instance Methods

```javascript
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this; // Enable method chaining
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  getResult() {
    return this.value;
  }
}

const calc = new Calculator(10);
const result = calc.add(5).multiply(2).subtract(3).getResult();
console.log(result); // 27
```

### Methods with Complex Logic

```javascript
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item, quantity = 1) {
    const existingItem = this.items.find((i) => i.name === item.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...item, quantity });
    }
  }

  removeItem(itemName) {
    this.items = this.items.filter((item) => item.name !== itemName);
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

const cart = new ShoppingCart();
cart.addItem({ name: "Apple", price: 1.5 }, 3);
cart.addItem({ name: "Banana", price: 0.75 }, 2);
console.log(cart.getTotal()); // 6.00
```

---

## Getters and Setters

Getters and setters allow you to define methods that are accessed like properties.

### Basic Getters and Setters

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this._celsius = value;
  }

  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9;
  }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77

temp.fahrenheit = 86;
console.log(temp.celsius); // 30
```

### Computed Properties

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    const parts = name.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
}

const person = new Person("John", "Doe");
console.log(person.fullName); // "John Doe"

person.fullName = "Jane Smith";
console.log(person.firstName); // "Jane"
console.log(person.lastName); // "Smith"
```

---

## Static Methods and Properties

Static members belong to the class itself, not to instances.

### Static Methods

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

// Call on the class, not an instance
console.log(MathHelper.add(5, 3)); // 8
console.log(MathHelper.multiply(4, 2)); // 8

// This won't work:
// const helper = new MathHelper();
// helper.add(5, 3); // Error!
```

### Static Properties

```javascript
class DatabaseConnection {
  static maxConnections = 10;
  static activeConnections = 0;

  constructor(name) {
    if (
      DatabaseConnection.activeConnections >= DatabaseConnection.maxConnections
    ) {
      throw new Error("Maximum connections reached");
    }
    this.name = name;
    DatabaseConnection.activeConnections++;
  }

  static getAvailableConnections() {
    return this.maxConnections - this.activeConnections;
  }

  close() {
    DatabaseConnection.activeConnections--;
  }
}

console.log(DatabaseConnection.maxConnections); // 10
const conn1 = new DatabaseConnection("db1");
console.log(DatabaseConnection.activeConnections); // 1
```

### Factory Pattern with Static Methods

```javascript
class User {
  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
  }

  static createAdmin(name, email) {
    return new User(name, email, "admin");
  }

  static createGuest(name, email) {
    return new User(name, email, "guest");
  }
}

const admin = User.createAdmin("Alice", "alice@example.com");
const guest = User.createGuest("Bob", "bob@example.com");

console.log(admin.role); // "admin"
console.log(guest.role); // "guest"
```

---

## Inheritance with extends

The `extends` keyword creates a class that is a child of another class.

### Basic Inheritance

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks`);
  }

  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

const dog = new Dog("Rex", "German Shepherd");
dog.speak(); // "Rex barks"
dog.fetch(); // "Rex fetches the ball"
```

### Multi-Level Inheritance

```javascript
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  start() {
    console.log(`${this.brand} vehicle starting...`);
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand);
    this.model = model;
    this.wheels = 4;
  }

  drive() {
    console.log(`Driving ${this.brand} ${this.model}`);
  }
}

class ElectricCar extends Car {
  constructor(brand, model, batteryCapacity) {
    super(brand, model);
    this.batteryCapacity = batteryCapacity;
  }

  charge() {
    console.log(`Charging ${this.brand} ${this.model}`);
  }
}

const tesla = new ElectricCar("Tesla", "Model 3", 75);
tesla.start(); // "Tesla vehicle starting..."
tesla.drive(); // "Driving Tesla Model 3"
tesla.charge(); // "Charging Tesla Model 3"
```

---

## The super Keyword

`super` is used to call methods on a parent class.

### Calling Parent Constructor

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Employee extends Person {
  constructor(name, age, employeeId, department) {
    super(name, age); // Must call super before using 'this'
    this.employeeId = employeeId;
    this.department = department;
  }
}

const emp = new Employee("Alice", 30, "E123", "Engineering");
console.log(emp.name); // "Alice"
console.log(emp.employeeId); // "E123"
```

### Calling Parent Methods

```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  describe() {
    const baseDescription = super.describe(); // Call parent method
    return `${baseDescription} with radius ${this.radius}`;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle("red", 5);
console.log(circle.describe()); // "A red shape with radius 5"
console.log(circle.getArea()); // 78.54
```

### super in Static Methods

```javascript
class Parent {
  static greet() {
    return "Hello from Parent";
  }
}

class Child extends Parent {
  static greet() {
    const parentGreeting = super.greet();
    return `${parentGreeting} and Child`;
  }
}

console.log(Child.greet()); // "Hello from Parent and Child"
```

---

## Method Overriding

Child classes can override parent methods to provide specialized behavior.

### Basic Override

```javascript
class Payment {
  constructor(amount) {
    this.amount = amount;
  }

  process() {
    console.log(`Processing payment of $${this.amount}`);
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, cardNumber) {
    super(amount);
    this.cardNumber = cardNumber;
  }

  process() {
    console.log(`Processing credit card payment of $${this.amount}`);
    console.log(`Card: ****${this.cardNumber.slice(-4)}`);
  }
}

class PayPalPayment extends Payment {
  constructor(amount, email) {
    super(amount);
    this.email = email;
  }

  process() {
    console.log(`Processing PayPal payment of $${this.amount}`);
    console.log(`Account: ${this.email}`);
  }
}

const payment1 = new CreditCardPayment(100, "1234567812345678");
const payment2 = new PayPalPayment(50, "user@example.com");

payment1.process();
// "Processing credit card payment of $100"
// "Card: ****5678"

payment2.process();
// "Processing PayPal payment of $50"
// "Account: user@example.com"
```

### Partial Override (Extending Parent Behavior)

```javascript
class Logger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }
}

class TimestampLogger extends Logger {
  log(message) {
    const timestamp = new Date().toISOString();
    super.log(`[${timestamp}] ${message}`);
  }
}

const logger = new TimestampLogger();
logger.log("Application started");
// [LOG] [2025-10-25T12:00:00.000Z] Application started
```

---

## Private Fields and Methods

Private fields and methods (prefixed with `#`) are only accessible within the class.

### Private Fields

```javascript
class BankAccount {
  #balance = 0; // Private field

  constructor(accountHolder, initialBalance) {
    this.accountHolder = accountHolder;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500

// This won't work:
// console.log(account.#balance); // SyntaxError
```

### Private Methods

```javascript
class CreditCard {
  #cardNumber;

  constructor(cardNumber) {
    this.#cardNumber = cardNumber;
  }

  #maskCardNumber() {
    return `****-****-****-${this.#cardNumber.slice(-4)}`;
  }

  displayCard() {
    return this.#maskCardNumber();
  }
}

const card = new CreditCard("1234567812345678");
console.log(card.displayCard()); // "****-****-****-5678"

// This won't work:
// card.#maskCardNumber(); // SyntaxError
```

### Private vs Convention (Underscore)

```javascript
class OldStylePrivate {
  constructor(value) {
    this._value = value; // Convention, but NOT truly private
  }

  getValue() {
    return this._value;
  }
}

class NewStylePrivate {
  #value; // Truly private

  constructor(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }
}

const old = new OldStylePrivate(10);
console.log(old._value); // 10 (accessible, but shouldn't be used)

const modern = new NewStylePrivate(10);
// console.log(modern.#value); // SyntaxError (truly private)
```

---

## Class Expressions

Classes can be defined as expressions, just like functions.

### Named Class Expression

```javascript
const Rectangle = class RectangleClass {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
};

const rect = new Rectangle(10, 5);
console.log(rect.getArea()); // 50
```

### Anonymous Class Expression

```javascript
const Circle = class {
  constructor(radius) {
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
};

const circle = new Circle(5);
console.log(circle.getArea()); // 78.54
```

### Using Class Expressions in Functions

```javascript
function createAnimal(type) {
  return class {
    constructor(name) {
      this.name = name;
      this.type = type;
    }

    describe() {
      return `${this.name} is a ${this.type}`;
    }
  };
}

const Dog = createAnimal("dog");
const Cat = createAnimal("cat");

const myDog = new Dog("Rex");
const myCat = new Cat("Whiskers");

console.log(myDog.describe()); // "Rex is a dog"
console.log(myCat.describe()); // "Whiskers is a cat"
```

---

## Prototype Chain

Understanding how classes work under the hood helps debug and optimize code.

### Prototype Relationship

```javascript
class Animal {
  speak() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog();

// Prototype chain
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

// instanceof checks the prototype chain
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
```

### Checking Properties and Methods

```javascript
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  start() {
    console.log("Starting...");
  }
}

const car = new Vehicle("Toyota");

// Own property vs inherited
console.log(car.hasOwnProperty("brand")); // true
console.log(car.hasOwnProperty("start")); // false (it's on prototype)

// Check if method exists
console.log("start" in car); // true
console.log(typeof car.start); // "function"
```

---

## Best Practices

### 1. Use Composition Over Inheritance When Appropriate

```javascript
// Instead of deep inheritance hierarchies
class FlyingBehavior {
  fly() {
    console.log("Flying");
  }
}

class SwimmingBehavior {
  swim() {
    console.log("Swimming");
  }
}

class Duck {
  constructor() {
    this.flyBehavior = new FlyingBehavior();
    this.swimBehavior = new SwimmingBehavior();
  }

  performFly() {
    this.flyBehavior.fly();
  }

  performSwim() {
    this.swimBehavior.swim();
  }
}
```

### 2. Initialize All Properties in Constructor

```javascript
// Good
class User {
  constructor(name) {
    this.name = name;
    this.posts = [];
    this.followers = 0;
  }
}

// Avoid
class UserBad {
  constructor(name) {
    this.name = name;
    // posts and followers are undefined initially
  }
}
```

### 3. Use Private Fields for Encapsulation

```javascript
class PasswordManager {
  #password;

  constructor(password) {
    this.#password = this.#hash(password);
  }

  #hash(password) {
    // Simplified hashing
    return `hashed_${password}`;
  }

  verifyPassword(inputPassword) {
    return this.#hash(inputPassword) === this.#password;
  }
}
```

### 4. Return `this` for Method Chaining

```javascript
class QueryBuilder {
  constructor() {
    this.query = "";
  }

  select(fields) {
    this.query += `SELECT ${fields} `;
    return this;
  }

  from(table) {
    this.query += `FROM ${table} `;
    return this;
  }

  where(condition) {
    this.query += `WHERE ${condition}`;
    return this;
  }

  build() {
    return this.query.trim();
  }
}

const query = new QueryBuilder()
  .select("*")
  .from("users")
  .where("age > 18")
  .build();

console.log(query); // "SELECT * FROM users WHERE age > 18"
```

### 5. Document Your Classes

```javascript
/**
 * Represents a user account in the system
 */
class UserAccount {
  /**
   * Create a new user account
   * @param {string} username - The user's username
   * @param {string} email - The user's email address
   */
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  /**
   * Update the user's email
   * @param {string} newEmail - The new email address
   * @returns {boolean} True if update was successful
   */
  updateEmail(newEmail) {
    if (this.#isValidEmail(newEmail)) {
      this.email = newEmail;
      return true;
    }
    return false;
  }

  #isValidEmail(email) {
    return email.includes("@");
  }
}
```

---

## Common Patterns

### Singleton Pattern

```javascript
class Database {
  static #instance = null;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    this.connection = "connected";
    Database.#instance = this;
  }

  query(sql) {
    console.log(`Executing: ${sql}`);
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true (same instance)
```

### Builder Pattern

```javascript
class Pizza {
  constructor(builder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.mushrooms = builder.mushrooms;
  }
}

class PizzaBuilder {
  constructor(size) {
    this.size = size;
    this.cheese = false;
    this.pepperoni = false;
    this.mushrooms = false;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addMushrooms() {
    this.mushrooms = true;
    return this;
  }

  build() {
    return new Pizza(this);
  }
}

const pizza = new PizzaBuilder("large").addCheese().addPepperoni().build();

console.log(pizza);
// Pizza { size: 'large', cheese: true, pepperoni: true, mushrooms: false }
```

### Observer Pattern

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received: ${data}`);
  }
}

const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("Hello observers!");
// Observer 1 received: Hello observers!
// Observer 2 received: Hello observers!
```

---

## Practice Exercises

### Exercise 1: Basic Class Creation

Create a `Book` class with properties for title, author, and pages. Add methods to:

- Get book info as a string
- Mark the book as read
- Check if the book is read

<details>
<summary>Solution</summary>

```javascript
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
  }

  getInfo() {
    return `"${this.title}" by ${this.author}, ${this.pages} pages`;
  }

  markAsRead() {
    this.isRead = true;
  }

  checkReadStatus() {
    return this.isRead ? "Already read" : "Not read yet";
  }
}

const book = new Book("1984", "George Orwell", 328);
console.log(book.getInfo());
console.log(book.checkReadStatus());
book.markAsRead();
console.log(book.checkReadStatus());
```

</details>

### Exercise 2: Inheritance

Create a base `Vehicle` class and two child classes: `Car` and `Motorcycle`. Each should have appropriate properties and methods.

<details>
<summary>Solution</summary>

```javascript
class Vehicle {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }

  getAge() {
    return new Date().getFullYear() - this.year;
  }

  describe() {
    return `${this.brand} from ${this.year}`;
  }
}

class Car extends Vehicle {
  constructor(brand, year, doors) {
    super(brand, year);
    this.doors = doors;
  }

  describe() {
    return `${super.describe()}, ${this.doors}-door car`;
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, year, type) {
    super(brand, year);
    this.type = type; // sport, cruiser, touring, etc.
  }

  describe() {
    return `${super.describe()}, ${this.type} motorcycle`;
  }
}

const car = new Car("Toyota", 2020, 4);
const bike = new Motorcycle("Harley-Davidson", 2019, "cruiser");

console.log(car.describe());
console.log(bike.describe());
console.log(`Car age: ${car.getAge()} years`);
```

</details>

### Exercise 3: Getters and Setters

Create a `Temperature` class that stores temperature in Celsius but allows getting/setting in both Celsius and Fahrenheit.

<details>
<summary>Solution</summary>

```javascript
class Temperature {
  constructor(celsius = 0) {
    this._celsius = celsius;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    if (typeof value !== "number") {
      throw new Error("Temperature must be a number");
    }
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this._celsius = value;
  }

  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this.celsius = ((value - 32) * 5) / 9;
  }

  get kelvin() {
    return this._celsius + 273.15;
  }
}

const temp = new Temperature(25);
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);

temp.fahrenheit = 100;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F`);
```

</details>

### Exercise 4: Private Fields

Create a `BankAccount` class with private balance and transaction history. Implement deposit, withdraw, and transaction history viewing.

<details>
<summary>Solution</summary>

```javascript
class BankAccount {
  #balance;
  #transactions;

  constructor(initialBalance = 0) {
    this.#balance = initialBalance;
    this.#transactions = [];
    this.#addTransaction("Initial deposit", initialBalance);
  }

  #addTransaction(type, amount) {
    this.#transactions.push({
      type,
      amount,
      balance: this.#balance,
      date: new Date(),
    });
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.#balance += amount;
    this.#addTransaction("Deposit", amount);
    return this.#balance;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
    this.#addTransaction("Withdrawal", amount);
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }

  getTransactionHistory() {
    return this.#transactions.map((t) => ({
      type: t.type,
      amount: t.amount,
      balanceAfter: t.balance,
      date: t.date.toISOString(),
    }));
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(`Balance: $${account.getBalance()}`);
console.log("Transaction History:", account.getTransactionHistory());
```

</details>

### Exercise 5: Complex Inheritance

Create a library system with `LibraryItem` as base class, and `Book`, `Magazine`, and `DVD` as child classes. Add appropriate properties and methods.

<details>
<summary>Solution</summary>

```javascript
class LibraryItem {
  constructor(title, year) {
    this.title = title;
    this.year = year;
    this.isCheckedOut = false;
  }

  checkOut() {
    if (this.isCheckedOut) {
      return false;
    }
    this.isCheckedOut = true;
    return true;
  }

  checkIn() {
    this.isCheckedOut = false;
  }

  getInfo() {
    return `${this.title} (${this.year})`;
  }
}

class Book extends LibraryItem {
  constructor(title, year, author, isbn) {
    super(title, year);
    this.author = author;
    this.isbn = isbn;
  }

  getInfo() {
    return `Book: "${this.title}" by ${this.author} (${this.year}) - ISBN: ${this.isbn}`;
  }
}

class Magazine extends LibraryItem {
  constructor(title, year, issue) {
    super(title, year);
    this.issue = issue;
  }

  getInfo() {
    return `Magazine: ${this.title} Issue ${this.issue} (${this.year})`;
  }
}

class DVD extends LibraryItem {
  constructor(title, year, director, duration) {
    super(title, year);
    this.director = director;
    this.duration = duration;
  }

  getInfo() {
    return `DVD: "${this.title}" directed by ${this.director} (${this.year}) - ${this.duration} min`;
  }
}

const book = new Book("The Hobbit", 1937, "J.R.R. Tolkien", "978-0547928227");
const magazine = new Magazine("National Geographic", 2025, "October");
const dvd = new DVD("Inception", 2010, "Christopher Nolan", 148);

console.log(book.getInfo());
console.log(magazine.getInfo());
console.log(dvd.getInfo());

book.checkOut();
console.log(`Book checked out: ${book.isCheckedOut}`);
```

</details>

---

## Summary

JavaScript classes provide a clear and organized way to create objects and implement inheritance. Key takeaways:

1. **Classes** are templates for creating objects with shared properties and methods
2. **Constructors** initialize new instances with specific values
3. **Methods** define behaviors that instances can perform
4. **Getters/Setters** provide controlled access to properties
5. **Static members** belong to the class itself, not instances
6. **Inheritance** allows classes to extend other classes using `extends`
7. **super** calls parent class constructors and methods
8. **Private fields** (#) ensure true encapsulation
9. **Prototype chain** is the underlying mechanism for inheritance

Remember that classes are syntactic sugar over JavaScript's prototype-based inheritance. Understanding both the class syntax and the underlying prototype chain will make you a more effective JavaScript developer.

---

## Additional Resources

- MDN Web Docs: Classes
- JavaScript.info: Classes
- ES6 Class Specification
- "You Don't Know JS" series by Kyle Simpson
- "Eloquent JavaScript" by Marijn Haverbeke

Happy coding! 🚀
