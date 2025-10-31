/**
 * Test Runner for JavaScript Class & Inheritance Assessment
 * Contains all test cases for each challenge
 */

const TestRunner = {
  // Test cases for Challenge 1
  challenge1: (userCode) => {
    const results = [];

    try {
      eval(userCode);

      const book1 = new Book("1984", "George Orwell", 328);
      const book2 = new Book("The Hobbit", "J.R.R. Tolkien", 310);

      results.push({
        test: "Test 1.1: book1.getInfo()",
        expected: '"1984 by George Orwell - 328 pages"',
        actual: book1.getInfo(),
        passed: book1.getInfo() === "1984 by George Orwell - 328 pages",
      });

      results.push({
        test: "Test 1.2: book2.getInfo()",
        expected: '"The Hobbit by J.R.R. Tolkien - 310 pages"',
        actual: book2.getInfo(),
        passed: book2.getInfo() === "The Hobbit by J.R.R. Tolkien - 310 pages",
      });

      results.push({
        test: "Test 1.3: book1.read()",
        expected: '"You are reading 1984"',
        actual: book1.read(),
        passed: book1.read() === "You are reading 1984",
      });
    } catch (error) {
      results.push({
        test: "Code Execution",
        error: error.message,
        passed: false,
      });
    }

    return results;
  },

  // Test cases for Challenge 2
  challenge2: (userCode) => {
    const results = [];

    try {
      eval(userCode);

      const account = new BankAccount("Alice", 1000);

      results.push({
        test: "Test 2.1: account.getBalance() === 1000",
        expected: 1000,
        actual: account.getBalance(),
        passed: account.getBalance() === 1000,
      });

      results.push({
        test: "Test 2.2: account.deposit(500) === 1500",
        expected: 1500,
        actual: account.deposit(500),
        passed: account.deposit(500) === 1500,
      });

      results.push({
        test: "Test 2.3: account.withdraw(200) === 1300",
        expected: 1300,
        actual: account.withdraw(200),
        passed: account.withdraw(200) === 1300,
      });

      results.push({
        test: 'Test 2.4: account.withdraw(2000) === "Insufficient funds"',
        expected: '"Insufficient funds"',
        actual: account.withdraw(2000),
        passed: account.withdraw(2000) === "Insufficient funds",
      });

      results.push({
        test: 'Test 2.5: account.accountHolder === "Alice"',
        expected: '"Alice"',
        actual: account.accountHolder,
        passed: account.accountHolder === "Alice",
      });
    } catch (error) {
      results.push({
        test: "Code Execution",
        error: error.message,
        passed: false,
      });
    }

    return results;
  },

  // Test cases for Challenge 3
  challenge3: (userCode) => {
    const results = [];

    try {
      eval(userCode);

      const animal = new Animal("Generic", "Unknown");
      const dog = new Dog("Max", "Golden Retriever");

      results.push({
        test: "Test 3.1: animal.makeSound()",
        expected: '"Some generic animal sound"',
        actual: animal.makeSound(),
        passed: animal.makeSound() === "Some generic animal sound",
      });

      results.push({
        test: "Test 3.2: animal.introduce()",
        expected: '"I am Generic, a Unknown"',
        actual: animal.introduce(),
        passed: animal.introduce() === "I am Generic, a Unknown",
      });

      results.push({
        test: "Test 3.3: dog.makeSound()",
        expected: '"Woof! Woof!"',
        actual: dog.makeSound(),
        passed: dog.makeSound() === "Woof! Woof!",
      });

      results.push({
        test: "Test 3.4: dog.introduce()",
        expected: '"I am Max, a Dog"',
        actual: dog.introduce(),
        passed: dog.introduce() === "I am Max, a Dog",
      });

      results.push({
        test: "Test 3.5: dog.getBreed()",
        expected: '"Golden Retriever"',
        actual: dog.getBreed(),
        passed: dog.getBreed() === "Golden Retriever",
      });
    } catch (error) {
      results.push({
        test: "Code Execution",
        error: error.message,
        passed: false,
      });
    }

    return results;
  },

  // Test cases for Challenge 4
  challenge4: (userCode) => {
    const results = [];

    try {
      eval(userCode);

      const vehicle = new Vehicle("Toyota", "Camry", 2020);
      const electricCar = new ElectricCar("Tesla", "Model 3", 2023, 75);

      results.push({
        test: "Test 4.1: vehicle.getAge() === 5",
        expected: 5,
        actual: vehicle.getAge(),
        passed: vehicle.getAge() === 5,
      });

      results.push({
        test: "Test 4.2: vehicle.getInfo()",
        expected: '"2020 Toyota Camry"',
        actual: vehicle.getInfo(),
        passed: vehicle.getInfo() === "2020 Toyota Camry",
      });

      results.push({
        test: "Test 4.3: electricCar.getAge() === 2",
        expected: 2,
        actual: electricCar.getAge(),
        passed: electricCar.getAge() === 2,
      });

      results.push({
        test: "Test 4.4: electricCar.getInfo()",
        expected: '"2023 Tesla Model 3 (Electric, 75kWh battery)"',
        actual: electricCar.getInfo(),
        passed:
          electricCar.getInfo() ===
          "2023 Tesla Model 3 (Electric, 75kWh battery)",
      });

      results.push({
        test: "Test 4.5: electricCar.getBatteryInfo()",
        expected: '"Battery capacity: 75kWh"',
        actual: electricCar.getBatteryInfo(),
        passed: electricCar.getBatteryInfo() === "Battery capacity: 75kWh",
      });
    } catch (error) {
      results.push({
        test: "Code Execution",
        error: error.message,
        passed: false,
      });
    }

    return results;
  },

  // Test cases for Challenge 5
  challenge5: (userCode) => {
    const results = [];

    try {
      eval(userCode);

      const shape = new Shape("Generic Shape");
      const rectangle = new Rectangle(5, 10);
      const square = new Square(4);

      results.push({
        test: "Test 5.1: shape.getArea() === 0",
        expected: 0,
        actual: shape.getArea(),
        passed: shape.getArea() === 0,
      });

      results.push({
        test: "Test 5.2: shape.getPerimeter() === 0",
        expected: 0,
        actual: shape.getPerimeter(),
        passed: shape.getPerimeter() === 0,
      });

      results.push({
        test: "Test 5.3: rectangle.getArea() === 50",
        expected: 50,
        actual: rectangle.getArea(),
        passed: rectangle.getArea() === 50,
      });

      results.push({
        test: "Test 5.4: rectangle.getPerimeter() === 30",
        expected: 30,
        actual: rectangle.getPerimeter(),
        passed: rectangle.getPerimeter() === 30,
      });

      results.push({
        test: "Test 5.5: rectangle.describe()",
        expected: '"This is a Rectangle with area 50 and perimeter 30"',
        actual: rectangle.describe(),
        passed:
          rectangle.describe() ===
          "This is a Rectangle with area 50 and perimeter 30",
      });

      results.push({
        test: "Test 5.6: square.getArea() === 16",
        expected: 16,
        actual: square.getArea(),
        passed: square.getArea() === 16,
      });

      results.push({
        test: "Test 5.7: square.getPerimeter() === 16",
        expected: 16,
        actual: square.getPerimeter(),
        passed: square.getPerimeter() === 16,
      });

      results.push({
        test: "Test 5.8: square.describe()",
        expected: '"This is a Square with side 4, area 16 and perimeter 16"',
        actual: square.describe(),
        passed:
          square.describe() ===
          "This is a Square with side 4, area 16 and perimeter 16",
      });
    } catch (error) {
      results.push({
        test: "Code Execution",
        error: error.message,
        passed: false,
      });
    }

    return results;
  },

  // Test cases for Bonus Challenge
  challengeBonus: (userCode) => {
    const results = [];

    try {
      eval(userCode);

      const temp = new Temperature(25);

      results.push({
        test: "Test B.1: temp.celsius === 25",
        expected: 25,
        actual: temp.celsius,
        passed: temp.celsius === 25,
      });

      results.push({
        test: "Test B.2: temp.fahrenheit === 77",
        expected: 77,
        actual: temp.fahrenheit,
        passed: temp.fahrenheit === 77,
      });

      temp.celsius = 0;
      results.push({
        test: "Test B.3: temp.celsius = 0; temp.fahrenheit === 32",
        expected: 32,
        actual: temp.fahrenheit,
        passed: temp.fahrenheit === 32,
      });

      temp.fahrenheit = 212;
      results.push({
        test: "Test B.4: temp.fahrenheit = 212; temp.celsius === 100",
        expected: 100,
        actual: temp.celsius,
        passed: temp.celsius === 100,
      });

      const freezing = Temperature.freezingPoint();
      results.push({
        test: "Test B.5: Temperature.freezingPoint().celsius === 0",
        expected: 0,
        actual: freezing.celsius,
        passed: freezing.celsius === 0,
      });

      const boiling = Temperature.boilingPoint();
      results.push({
        test: "Test B.6: Temperature.boilingPoint().celsius === 100",
        expected: 100,
        actual: boiling.celsius,
        passed: boiling.celsius === 100,
      });

      // Test absolute zero limit
      try {
        temp.celsius = -300;
        results.push({
          test: "Test B.7: Should prevent temperature below absolute zero",
          expected: "Error thrown",
          actual: "No error thrown",
          passed: false,
        });
      } catch (e) {
        results.push({
          test: "Test B.7: Should prevent temperature below absolute zero",
          expected: "Error thrown",
          actual: "Error thrown: " + e.message,
          passed: true,
        });
      }
    } catch (error) {
      results.push({
        test: "Code Execution",
        error: error.message,
        passed: false,
      });
    }

    return results;
  },

  // Run tests for a specific challenge
  runTests: (challengeNumber, userCode) => {
    const testFunction = TestRunner[`challenge${challengeNumber}`];
    if (!testFunction) {
      return [
        {
          test: "Invalid Challenge",
          error: `No tests found for challenge ${challengeNumber}`,
          passed: false,
        },
      ];
    }
    return testFunction(userCode);
  },
};
