import { describe, expectTypeOf, it } from "vitest";
import type { Enumerated } from "./main.js";
import { enumerate } from "./main.js";
describe("enumerate", () => {
  it("should create an enum from an array of strings", () => {
    // Act
    const enumConst = enumerate(["foo", "bar", "baz"]);

    // Assert
    expectTypeOf(enumConst).toEqualTypeOf<
      Enumerated<{ foo: 0; bar: 1; baz: 2 }>
    >();
    expectTypeOf(enumConst.foo).toEqualTypeOf<0>();
    expectTypeOf(enumConst.bar).toEqualTypeOf<1>();
    expectTypeOf(enumConst.baz).toEqualTypeOf<2>();
    expectTypeOf(enumConst.infer).toEqualTypeOf<0 | 1 | 2>();
  });

  it("should create an enum from a record of strings", () => {
    // Act
    const enumConst = enumerate({ foo: "foo", bar: "bar", baz: "baz" });

    // Assert
    expectTypeOf(enumConst).toEqualTypeOf<
      Enumerated<{ foo: "foo"; bar: "bar"; baz: "baz" }>
    >();
    expectTypeOf(enumConst.foo).toEqualTypeOf<"foo">();
    expectTypeOf(enumConst.bar).toEqualTypeOf<"bar">();
    expectTypeOf(enumConst.baz).toEqualTypeOf<"baz">();
    expectTypeOf(enumConst.infer).toEqualTypeOf<"foo" | "bar" | "baz">();
  });

  it("should create an enum from a record of numbers", () => {
    // Act
    const enumConst = enumerate({ foo: 0, bar: 1, baz: 2 });

    // Assert
    expectTypeOf(enumConst).toEqualTypeOf<
      Enumerated<{ foo: 0; bar: 1; baz: 2 }>
    >();
    expectTypeOf(enumConst.foo).toEqualTypeOf<0>();
    expectTypeOf(enumConst.bar).toEqualTypeOf<1>();
    expectTypeOf(enumConst.baz).toEqualTypeOf<2>();
    expectTypeOf(enumConst.infer).toEqualTypeOf<0 | 1 | 2>();
  });
});
