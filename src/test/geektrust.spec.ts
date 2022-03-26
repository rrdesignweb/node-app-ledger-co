const { expect } = require("chai");
const assert = require("assert");
let txtOption1 = 1;
let txtOption2 = 2;

describe("Main", function () {
  it("Should return input text file for 1", function () {
    assert.equal(txtOption1, 1);
    //TODO: unit test?
  });
  it("Should return input text file for 2 ", function () {
    assert.equal(txtOption2, 2);
    //TODO: unit test?
  });
  it("Should return input text file for 2 ", function () {
    assert.equal(txtOption2, "xyz");
  });
});

