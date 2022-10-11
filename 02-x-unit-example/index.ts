import assert from 'assert';

class TestResult {
  runCount = 0;
  errorCount = 0;

  testStarted() {
    this.runCount++;
  }
  testFailed() {
    this.errorCount++;
  }

  summary() {
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}

class TestCase {
  constructor(readonly name: string) {}

  setUp() {}

  teardown() {}

  run() {
    const result = new TestResult();
    this.setUp();
    result.testStarted();
    try {
      (this[this.name as keyof TestCase] as Function)();
    } catch (error) {
      result.testFailed();
    }
    this.teardown();
    return result;
  }
}

class TestSuite {
  tests: TestCase[] = [];

  add(testCase: TestCase) {
    this.tests.push(testCase);
  }

  run() {
    const result = new TestResult();
    this.tests.forEach((test) => {
      console.log({ test });
      test.run();
    });
    return result;
  }
}

class WasRun extends TestCase {
  log = '';

  override setUp() {
    this.log = 'setUp ';
  }

  testMethod() {
    this.log += 'testMethod ';
  }

  testBrokenMethod() {
    throw new Error('Broken Method');
  }

  override teardown(): void {
    this.log += 'tearDown ';
  }
}

class TestCaseTest extends TestCase {
  override setUp(): void {}

  testTemplateMethod() {
    const test = new WasRun('testMethod');
    test.run();
    assert.deepStrictEqual(test.log, 'setUp testMethod tearDown ');
  }

  testResult() {
    const test = new WasRun('testMethod');
    const result = test.run();
    assert.deepStrictEqual(result.summary(), '1 run, 0 failed');
  }

  testFailedResult() {
    const test = new WasRun('testBrokenMethod');
    const result = test.run();
    assert.deepStrictEqual(result.summary(), '1 run, 1 failed');
  }

  testFailedResultFormatting() {
    const result = new TestResult();
    result.testStarted();
    result.testFailed();
    assert.deepStrictEqual(result.summary(), '1 run, 1 failed');
  }

  testSuite() {
    const suite = new TestSuite();
    suite.add(new WasRun('testMethod'));
    suite.add(new WasRun('testBrokenMethod'));
    const result = suite.run();
    assert.deepStrictEqual(result.summary(), '2 run, 1 failed');
  }
}

new TestCaseTest('testTemplateMethod').run();
new TestCaseTest('testResult').run();
new TestCaseTest('testFailedResultFormatting').run();
new TestCaseTest('testFailedResult').run();
new TestCaseTest('testSuite').run();
