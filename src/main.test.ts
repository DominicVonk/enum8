import { describe, expect, it } from "vitest";
import { enumerate } from "./main.js";

describe("enumerate", () => {
  it("should create an enum from an array of strings", () => {
    // Act
    const enumConst = enumerate(["foo", "bar", "baz"]);

    // Assert
    expect(enumConst).toEqual({
      foo: 0,
      bar: 1,
      baz: 2,
    });
    expect(enumConst.foo).toEqual(0);
    expect(enumConst.bar).toEqual(1);
    expect(enumConst.baz).toEqual(2);
  });

  it("should create an enum from a record of strings", () => {
    // Act
    const enumConst = enumerate({ foo: "foo", bar: "bar", baz: "baz" });

    // Assert
    expect(enumConst).toEqual({
      foo: "foo",
      bar: "bar",
      baz: "baz",
    });
    expect(enumConst.foo).toEqual("foo");
    expect(enumConst.bar).toEqual("bar");
    expect(enumConst.baz).toEqual("baz");
  });

  it("should create an enum from a record of numbers", () => {
    // Act
    const enumConst = enumerate({ foo: 0, bar: 1, baz: 2 });

    // Assert
    expect(enumConst).toEqual({
      foo: 0,
      bar: 1,
      baz: 2,
    });
    expect(enumConst.foo).toEqual(0);
    expect(enumConst.bar).toEqual(1);
    expect(enumConst.baz).toEqual(2);
  });
});
