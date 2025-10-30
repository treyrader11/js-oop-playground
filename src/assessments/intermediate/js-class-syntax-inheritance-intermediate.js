/**
 * ============================================
 * JAVASCRIPT CLASS & INHERITANCE ASSESSMENT
 * INTERMEDIATE LEVEL
 * ============================================
 *
 * This assessment contains 6 intermediate challenges that build upon basic class knowledge.
 * Each challenge focuses on advanced aspects of JavaScript classes and inheritance.
 *
 * Instructions:
 * 1. Read each challenge description carefully
 * 2. Write your code in the designated area
 * 3. Run the test cases to verify your solution
 * 4. All test cases should pass before moving to the next challenge
 *
 * To run: node js-class-syntax-inheritance-intermediate.js
 */

console.log(
  "=== JavaScript Class & Inheritance Assessment - INTERMEDIATE ===\n"
);

// ============================================
// CHALLENGE 1: Method Chaining
// ============================================
/**
 * Create a class called 'QueryBuilder' that demonstrates method chaining:
 * - Constructor initializes an empty query string and empty conditions array
 * - Method 'select(fields)' - sets the fields to select (store as string)
 * - Method 'from(table)' - sets the table name
 * - Method 'where(condition)' - adds a condition to conditions array
 * - Method 'orderBy(field)' - sets the order field
 * - Method 'build()' - returns the complete query as a string:
 *   "SELECT [fields] FROM [table] WHERE [condition1] AND [condition2] ORDER BY [field]"
 *   (if no conditions, omit WHERE clause; if no orderBy, omit ORDER BY clause)
 *
 * All methods except build() should return 'this' to allow chaining.
 */

// YOUR CODE HERE
class QueryBuilder {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 1
console.log("Challenge 1: Method Chaining");
try {
  const query1 = new QueryBuilder()
    .select("*")
    .from("users")
    .where("age > 18")
    .where("status = 'active'")
    .orderBy("name")
    .build();

  const query2 = new QueryBuilder()
    .select("name, email")
    .from("customers")
    .build();

  console.assert(
    query1 ===
      "SELECT * FROM users WHERE age > 18 AND status = 'active' ORDER BY name",
    "Test 1.1 Failed"
  );
  console.assert(
    query2 === "SELECT name, email FROM customers",
    "Test 1.2 Failed"
  );
  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 2: Abstract Base Class Pattern
// ============================================
/**
 * Create an abstract-like base class 'PaymentProcessor' with:
 * - Constructor that accepts: merchantId
 * - Method 'processPayment(amount)' that throws an error:
 *   "processPayment must be implemented by subclass"
 * - Method 'refund(transactionId, amount)' that throws an error:
 *   "refund must be implemented by subclass"
 * - Method 'getReceipt(transactionId, amount)' that returns:
 *   "Receipt for transaction [transactionId]: $[amount] (Merchant: [merchantId])"
 *
 * Create a child class 'CreditCardProcessor' that extends PaymentProcessor:
 * - Constructor accepts: merchantId, processingFee (as a decimal, e.g., 0.03 for 3%)
 * - Override 'processPayment(amount)' to return:
 *   "Processing credit card payment of $[amount] (fee: $[calculatedFee])"
 * - Override 'refund(transactionId, amount)' to return:
 *   "Refunding $[amount] to credit card for transaction [transactionId]"
 * - Add method 'calculateFee(amount)' that returns the fee amount
 */

// YOUR CODE HERE
class PaymentProcessor {
  // Write your solution here
}

class CreditCardProcessor extends PaymentProcessor {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 2
console.log("Challenge 2: Abstract Base Class Pattern");
try {
  const processor = new CreditCardProcessor("MERCH123", 0.03);

  console.assert(
    processor.processPayment(100) ===
      "Processing credit card payment of $100 (fee: $3)",
    "Test 2.1 Failed"
  );
  console.assert(
    processor.refund("TXN456", 50) ===
      "Refunding $50 to credit card for transaction TXN456",
    "Test 2.2 Failed"
  );
  console.assert(
    processor.getReceipt("TXN789", 200) ===
      "Receipt for transaction TXN789: $200 (Merchant: MERCH123)",
    "Test 2.3 Failed"
  );
  console.assert(processor.calculateFee(100) === 3, "Test 2.4 Failed");

  // Test that base class throws errors
  const baseProcessor = new PaymentProcessor("BASE");
  try {
    baseProcessor.processPayment(100);
    console.log("✗ Test 2.5 Failed - Base class should throw error");
  } catch (e) {
    console.assert(
      e.message === "processPayment must be implemented by subclass",
      "Test 2.5 Failed"
    );
  }

  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 3: Composition Over Inheritance
// ============================================
/**
 * Instead of deep inheritance, use composition by creating component classes.
 *
 * Create a class 'Engine' with:
 * - Constructor that accepts: horsepower, type (e.g., "V6", "Electric")
 * - Method 'start()' that returns "Engine started: [type] engine ([horsepower]hp)"
 * - Method 'getSpecs()' that returns "[horsepower]hp [type]"
 *
 * Create a class 'GPS' with:
 * - Constructor that accepts: provider (e.g., "TomTom", "Garmin")
 * - Method 'navigate(destination)' that returns "Navigating to [destination] using [provider]"
 *
 * Create a class 'Car' that uses composition:
 * - Constructor that accepts: make, model, engine (Engine instance), gps (GPS instance or null)
 * - Method 'start()' that returns the engine's start message
 * - Method 'getInfo()' that returns "[make] [model] with [engine specs]"
 * - Method 'navigateTo(destination)' that:
 *   - If GPS exists, returns the GPS navigation message
 *   - If no GPS, returns "No GPS system available"
 */

// YOUR CODE HERE
class Engine {
  // Write your solution here
}

class GPS {
  // Write your solution here
}

class Car {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 3
console.log("Challenge 3: Composition Over Inheritance");
try {
  const v6Engine = new Engine(300, "V6");
  const electricEngine = new Engine(450, "Electric");
  const gps = new GPS("TomTom");

  const car1 = new Car("Ford", "Mustang", v6Engine, gps);
  const car2 = new Car("Tesla", "Model S", electricEngine, null);

  console.assert(
    car1.start() === "Engine started: V6 engine (300hp)",
    "Test 3.1 Failed"
  );
  console.assert(
    car1.getInfo() === "Ford Mustang with 300hp V6",
    "Test 3.2 Failed"
  );
  console.assert(
    car1.navigateTo("New York") === "Navigating to New York using TomTom",
    "Test 3.3 Failed"
  );
  console.assert(
    car2.navigateTo("Boston") === "No GPS system available",
    "Test 3.4 Failed"
  );
  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 4: Factory Pattern with Classes
// ============================================
/**
 * Create a factory pattern for creating different types of notifications.
 *
 * Create a base class 'Notification' with:
 * - Constructor that accepts: message, recipient
 * - Method 'send()' that throws error "send must be implemented by subclass"
 * - Method 'getDetails()' that returns "To: [recipient], Message: [message]"
 *
 * Create child classes:
 * - 'EmailNotification' extends Notification
 *   - Constructor accepts: message, recipient, subject
 *   - Override 'send()' to return "Sending email to [recipient]: [subject] - [message]"
 *
 * - 'SMSNotification' extends Notification
 *   - Constructor accepts: message, recipient, phoneNumber
 *   - Override 'send()' to return "Sending SMS to [phoneNumber]: [message]"
 *
 * - 'PushNotification' extends Notification
 *   - Constructor accepts: message, recipient, deviceId
 *   - Override 'send()' to return "Sending push to device [deviceId]: [message]"
 *
 * Create a class 'NotificationFactory' with:
 * - Static method 'createNotification(type, message, recipient, extra)' that:
 *   - If type is "email", creates EmailNotification (extra is subject)
 *   - If type is "sms", creates SMSNotification (extra is phoneNumber)
 *   - If type is "push", creates PushNotification (extra is deviceId)
 *   - Otherwise throws error "Unknown notification type: [type]"
 */

// YOUR CODE HERE
class Notification {
  // Write your solution here
}

class EmailNotification extends Notification {
  // Write your solution here
}

class SMSNotification extends Notification {
  // Write your solution here
}

class PushNotification extends Notification {
  // Write your solution here
}

class NotificationFactory {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 4
console.log("Challenge 4: Factory Pattern with Classes");
try {
  const email = NotificationFactory.createNotification(
    "email",
    "Welcome!",
    "user@example.com",
    "Welcome to our app"
  );
  const sms = NotificationFactory.createNotification(
    "sms",
    "Your code is 1234",
    "John Doe",
    "+1234567890"
  );
  const push = NotificationFactory.createNotification(
    "push",
    "New message received",
    "Jane",
    "device-abc-123"
  );

  console.assert(
    email.send() ===
      "Sending email to user@example.com: Welcome to our app - Welcome!",
    "Test 4.1 Failed"
  );
  console.assert(
    sms.send() === "Sending SMS to +1234567890: Your code is 1234",
    "Test 4.2 Failed"
  );
  console.assert(
    push.send() ===
      "Sending push to device device-abc-123: New message received",
    "Test 4.3 Failed"
  );
  console.assert(
    email.getDetails() === "To: user@example.com, Message: Welcome!",
    "Test 4.4 Failed"
  );

  // Test unknown type
  try {
    NotificationFactory.createNotification("fax", "test", "recipient", "extra");
    console.log("✗ Test 4.5 Failed - Should throw error for unknown type");
  } catch (e) {
    console.assert(
      e.message === "Unknown notification type: fax",
      "Test 4.5 Failed"
    );
  }

  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 5: Mixin Pattern
// ============================================
/**
 * Create mixins (objects with methods) that can be added to classes.
 *
 * Create a mixin object 'TimestampMixin' with methods:
 * - 'setCreatedAt()' - sets this.createdAt to current date
 * - 'setUpdatedAt()' - sets this.updatedAt to current date
 * - 'getTimestamps()' - returns object with createdAt and updatedAt
 *
 * Create a mixin object 'ValidationMixin' with methods:
 * - 'validate()' - returns true (to be overridden)
 * - 'isValid()' - returns result of calling this.validate()
 *
 * Create a function 'applyMixins(targetClass, ...mixins)' that:
 * - Takes a class and any number of mixin objects
 * - Copies all methods from mixins to targetClass.prototype
 *
 * Create a class 'User' with:
 * - Constructor that accepts: username, email
 * - Override 'validate()' to return true if username and email are not empty
 * - Method 'getInfo()' that returns "[username] ([email])"
 *
 * Apply both mixins to User class.
 */

// YOUR CODE HERE
const TimestampMixin = {
  // Write your solution here
};

const ValidationMixin = {
  // Write your solution here
};

function applyMixins(targetClass, ...mixins) {
  // Write your solution here
}

class User {
  // Write your solution here
}

// Apply mixins here
// END YOUR CODE

// Test Cases for Challenge 5
console.log("Challenge 5: Mixin Pattern");
try {
  const user = new User("johndoe", "john@example.com");

  user.setCreatedAt();
  user.setUpdatedAt();

  console.assert(
    user.getInfo() === "johndoe (john@example.com)",
    "Test 5.1 Failed"
  );
  console.assert(user.isValid() === true, "Test 5.2 Failed");
  console.assert(user.createdAt instanceof Date, "Test 5.3 Failed");
  console.assert(user.updatedAt instanceof Date, "Test 5.4 Failed");

  const timestamps = user.getTimestamps();
  console.assert(timestamps.createdAt instanceof Date, "Test 5.5 Failed");
  console.assert(timestamps.updatedAt instanceof Date, "Test 5.6 Failed");

  const invalidUser = new User("", "");
  console.assert(invalidUser.isValid() === false, "Test 5.7 Failed");

  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// CHALLENGE 6: Advanced Private Fields & Static Members
// ============================================
/**
 * Create a sophisticated class using private fields and static members.
 *
 * Create a class 'Database' with:
 * - Private static field '#instance' (for singleton pattern)
 * - Private field '#connected'
 * - Private field '#data' (initialize as empty object)
 * - Private static field '#connectionCount' (initialize to 0)
 *
 * - Static method 'getInstance()' that:
 *   - If #instance doesn't exist, creates new Database and stores in #instance
 *   - Returns #instance (singleton pattern - only one instance ever exists)
 *
 * - Static method 'getConnectionCount()' that returns #connectionCount
 *
 * - Method 'connect()' that:
 *   - Sets #connected to true
 *   - Increments #connectionCount
 *   - Returns "Database connected"
 *
 * - Method 'disconnect()' that:
 *   - Sets #connected to false
 *   - Returns "Database disconnected"
 *
 * - Method 'isConnected()' that returns #connected
 *
 * - Method 'set(key, value)' that:
 *   - If not connected, throws error "Database not connected"
 *   - Otherwise, stores key-value in #data and returns "Data saved"
 *
 * - Method 'get(key)' that:
 *   - If not connected, throws error "Database not connected"
 *   - Returns value for key, or undefined if key doesn't exist
 */

// YOUR CODE HERE
class Database {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Challenge 6
console.log("Challenge 6: Advanced Private Fields & Static Members");
try {
  const db1 = Database.getInstance();
  const db2 = Database.getInstance();

  console.assert(db1 === db2, "Test 6.1 Failed - Should return same instance");
  console.assert(db1.isConnected() === false, "Test 6.2 Failed");

  db1.connect();
  console.assert(db1.isConnected() === true, "Test 6.3 Failed");
  console.assert(Database.getConnectionCount() === 1, "Test 6.4 Failed");

  console.assert(
    db1.set("user1", { name: "Alice" }) === "Data saved",
    "Test 6.5 Failed"
  );
  console.assert(db1.get("user1").name === "Alice", "Test 6.6 Failed");
  console.assert(db1.get("nonexistent") === undefined, "Test 6.7 Failed");

  db1.disconnect();
  console.assert(db1.isConnected() === false, "Test 6.8 Failed");

  // Test error when not connected
  try {
    db1.set("test", "value");
    console.log("✗ Test 6.9 Failed - Should throw error when not connected");
  } catch (e) {
    console.assert(e.message === "Database not connected", "Test 6.9 Failed");
  }

  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

// ============================================
// BONUS CHALLENGE: Observer Pattern with Classes
// ============================================
/**
 * Implement the Observer pattern for event-driven programming.
 *
 * Create a class 'EventEmitter' with:
 * - Private field '#events' (initialize as empty object)
 *
 * - Method 'on(eventName, callback)' that:
 *   - Adds callback to array of listeners for eventName
 *   - If eventName doesn't exist in #events, create empty array first
 *   - Returns this (for chaining)
 *
 * - Method 'emit(eventName, data)' that:
 *   - Calls all callbacks registered for eventName with data
 *   - Returns number of listeners that were called
 *
 * - Method 'off(eventName, callback)' that:
 *   - Removes specific callback from eventName listeners
 *   - Returns this (for chaining)
 *
 * - Method 'once(eventName, callback)' that:
 *   - Registers callback that will only be called once
 *   - After being called once, it should be automatically removed
 *   - Returns this (for chaining)
 *
 * Create a class 'NewsPublisher' that extends EventEmitter:
 * - Constructor that accepts: name
 * - Method 'publishArticle(article)' that:
 *   - Emits 'article-published' event with article data
 *   - Returns "Published: [article.title]"
 * - Method 'getName()' that returns the publisher name
 */

// YOUR CODE HERE
class EventEmitter {
  // Write your solution here
}

class NewsPublisher extends EventEmitter {
  // Write your solution here
}
// END YOUR CODE

// Test Cases for Bonus Challenge
console.log("BONUS Challenge: Observer Pattern with Classes");
try {
  const publisher = new NewsPublisher("Tech Daily");
  let articleCount = 0;
  let lastArticle = null;
  let onceCallCount = 0;

  // Regular listener
  publisher.on("article-published", (article) => {
    articleCount++;
    lastArticle = article;
  });

  // Once listener
  publisher.once("article-published", (article) => {
    onceCallCount++;
  });

  const result1 = publisher.publishArticle({
    title: "AI Breakthrough",
    content: "...",
  });
  console.assert(result1 === "Published: AI Breakthrough", "Test B.1 Failed");
  console.assert(articleCount === 1, "Test B.2 Failed");
  console.assert(lastArticle.title === "AI Breakthrough", "Test B.3 Failed");
  console.assert(onceCallCount === 1, "Test B.4 Failed");

  publisher.publishArticle({ title: "New Framework Released", content: "..." });
  console.assert(articleCount === 2, "Test B.5 Failed");
  console.assert(
    onceCallCount === 1,
    "Test B.6 Failed - once listener should only fire once"
  );

  // Test off method
  const removeListener = (article) => {
    articleCount++;
  };
  publisher.on("article-published", removeListener);
  publisher.off("article-published", removeListener);

  const previousCount = articleCount;
  publisher.publishArticle({ title: "Test", content: "..." });
  console.assert(
    articleCount === previousCount + 1,
    "Test B.7 Failed - removed listener should not fire"
  );

  console.assert(publisher.getName() === "Tech Daily", "Test B.8 Failed");

  console.log("✓ All tests passed!\n");
} catch (error) {
  console.log("✗ Tests failed:", error.message, "\n");
}

console.log("=== Assessment Complete ===");
console.log("\nKey Intermediate Concepts Covered:");
console.log("- Method chaining for fluent interfaces");
console.log("- Abstract base class pattern");
console.log("- Composition over inheritance");
console.log("- Factory pattern for object creation");
console.log("- Mixin pattern for code reuse");
console.log("- Singleton pattern with static members");
console.log("- Observer pattern for event-driven code");
console.log("- Advanced private fields and encapsulation");
