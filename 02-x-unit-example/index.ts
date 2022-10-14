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

  run(result: TestResult) {
    this.setUp();
    result.testStarted();
    try {
      (this[this.name as keyof TestCase] as Function)();
    } catch (error) {
      result.testFailed();
    }
    this.teardown();
  }
}

class TestSuite {
  tests: TestCase[] = [];

  add(testCase: TestCase) {
    this.tests.push(testCase);
  }

  run(result: TestResult) {
    this.tests.forEach((test) => {
      test.run(result);
    });
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
  result!: TestResult;

  override setUp(): void {
    this.result = new TestResult();
  }

  testTemplateMethod() {
    const test = new WasRun('testMethod');
    test.run(this.result);
    assert.strictEqual(test.log, 'setUp testMethod tearDown ');
  }

  testResult() {
    const test = new WasRun('testMethod');
    test.run(this.result);
    assert.strictEqual(this.result.summary(), '1 run, 0 failed');
  }

  testFailedResult() {
    const test = new WasRun('testBrokenMethod');
    test.run(this.result);
    assert.strictEqual(this.result.summary(), '1 run, 1 failed');
  }

  testFailedResultFormatting() {
    this.result.testStarted();
    this.result.testFailed();
    assert.strictEqual(this.result.summary(), '1 run, 1 failed');
  }

  testSuite() {
    const suite = new TestSuite();
    suite.add(new WasRun('testMethod'));
    suite.add(new WasRun('testBrokenMethod'));
    suite.run(this.result);
    assert.strictEqual(this.result.summary(), '2 run, 1 failed');
  }
}

const suite = new TestSuite();

suite.add(new TestCaseTest('testTemplateMethod'));
suite.add(new TestCaseTest('testResult'));
suite.add(new TestCaseTest('testFailedResultFormatting'));
suite.add(new TestCaseTest('testFailedResult'));
suite.add(new TestCaseTest('testSuite'));
const resultGlobal = new TestResult();
suite.run(resultGlobal);
console.log(resultGlobal.summary());
