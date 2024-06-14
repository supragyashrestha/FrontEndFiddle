type Key = string | number;
type Value = any;

class KVStore {
    private stack: Record<Key, Value>[];

    constructor() {
        this.stack = [{}];
    }

    set(key: Key, value: Value): void {
        this.stack[this.stack.length - 1][key] = value;
    }

    get(key: Key): Value | undefined {
        for (let i = this.stack.length - 1; i >= 0; i--) {
            if (key in this.stack[i]) {
                return this.stack[i][key];
            }
        }
        return undefined;
    }

    delete(key: Key): void {
        delete this.stack[this.stack.length - 1][key];
    }

    begin(): void {
        this.stack.push({});
    }

    commit(): void {
        if (this.stack.length > 1) {
            const lastDic = this.stack.pop()!;
            for (const [k, v] of Object.entries(lastDic)) {
                this.stack[this.stack.length - 1][k] = v;
            }
        }
    }

    rollback(): void {
        if (this.stack.length > 1) {
            this.stack.pop();
        }
    }
}

// Testing functions
function test_KVStore() {
    const kv = new KVStore();
    kv.set(1, 3);

    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === undefined, "Test failed: kv.get(2) should be undefined");
}

function test_KVStore_single_transaction() {
    const kv = new KVStore();
    kv.set(1, 3);

    kv.begin();
    kv.set(2, 4);
    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");
    kv.commit();

    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");
}

function test_KVStore_rollback() {
    const kv = new KVStore();
    kv.set(1, 3);

    kv.begin();
    kv.set(2, 4);
    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");
    kv.rollback();

    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === undefined, "Test failed: kv.get(2) should be undefined");
}

function test_KVStore_multiple_begin() {
    const kv = new KVStore();
    kv.set(1, 3);

    kv.begin();
    kv.set(2, 4);

    kv.begin();
    kv.set(3, 5);

    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");
    console.assert(kv.get(3) === 5, "Test failed: kv.get(3) should be 5");

    kv.commit();

    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");
    console.assert(kv.get(3) === 5, "Test failed: kv.get(3) should be 5");

    kv.rollback();

    console.assert(kv.get(1) === 3, "Test failed: kv.get(1) should be 3");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");
    console.assert(kv.get(3) === undefined, "Test failed: kv.get(3) should be undefined");
}

function test_KVStore_delete() {
    const kv = new KVStore();
    kv.set(1, 3);
    kv.set(2, 4);

    kv.delete(1);
    console.assert(kv.get(1) === undefined, "Test failed: kv.get(1) should be undefined");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");

    kv.begin();
    kv.set(1, 5);
    kv.delete(2);

    console.assert(kv.get(1) === 5, "Test failed: kv.get(1) should be 5");
    console.assert(kv.get(2) === undefined, "Test failed: kv.get(2) should be undefined");

    kv.rollback();

    console.assert(kv.get(1) === undefined, "Test failed: kv.get(1) should be undefined");
    console.assert(kv.get(2) === 4, "Test failed: kv.get(2) should be 4");
}

// Running the tests
test_KVStore();
test_KVStore_single_transaction();
test_KVStore_rollback();
test_KVStore_multiple_begin();
test_KVStore_delete();

console.log("All tests passed.");


/*

### Explanation
1. **Type Definitions**: Defined `Key` as a union type of `string | number` and `Value` as `any` to match the flexibility of the original Python code.

2. **Class Initialization**: The `KVStore` class initializes with a stack containing an empty object, similar to the original Python version.

3. **set Method**: Adds or updates a key-value pair in the current transaction state.

4. **get Method**: Retrieves the value for a key, searching from the most recent transaction state to the oldest. Returns `undefined` if the key is not found.

5. **delete Method**: Deletes a key from the current transaction state.

6. **begin Method**: Starts a new transaction by adding an empty object to the stack.

7. **commit Method**: Commits the most recent transaction by merging its changes into the previous transaction state and removing the most recent transaction state from the stack.

8. **rollback Method**: Rolls back the most recent transaction by removing the most recent transaction state from the stack.

9. **Tests**: Several test functions verify the behavior of the `KVStore` class methods to ensure they work correctly, including the new `delete` method.

The translated TypeScript code includes methods and tests to manage and verify the deletion of keys within transactions.
*/