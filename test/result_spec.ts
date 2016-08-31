/// <reference path="./painless.d.ts" /> 
import {Result, Success, Failure, Results} from "../dist/result"
import { createGroup, assert } from "painless";

const test = createGroup();


test('Results.success(value)', () => {
    let success: Success<string> = Results.success("okay!");
    assert.deepEqual(success, {isSuccess: true, value: "okay!"});
});
test('Results.failure(reason)', () => {
    let failure: Failure = Results.failure("it broke!");
    assert.deepEqual(failure, {isSuccess: false, reason: "it broke!"});
});
test('Results.attempt(fn)', () => {
    let success: Result<number> = Results.attempt(() => 42);
    assert.deepEqual(success, {isSuccess: true, value: 42});

    let failure: Result<number> = Results.attempt(() => {
        throw "It broke!";
    });
    assert.deepEqual(failure, {isSuccess: false, reason: "It broke!"});
});

test('Usage with TS2.0', () => {
    let success: Result<number> = Results.attempt(() => 42);
    if(success.isSuccess){
        assert.equal(success.value, 42)
    } else {
        assert.fail("should have been a success!");
    }

    let failure: Result<number> = Results.attempt(() => {
        throw "It broke!";
    });
    if (failure.isSuccess != true){
        assert.equal(failure.reason, "It broke!");
    } else {
        assert.fail("should have been a failure!");
    }
})
