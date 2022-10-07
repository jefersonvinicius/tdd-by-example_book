import assert from 'assert';

class TestCase {
  constructor(readonly name: string) {}

  setUp() {}

  teardown() {}

  run() {
    this.setUp();
    (this[this.name as keyof TestCase] as Function)();
    this.teardown();
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
}

new TestCaseTest('testTemplateMethod').run();
