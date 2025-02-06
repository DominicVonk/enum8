# enum8

A modern, type-safe way to create and work with enums in JavaScript and TypeScript. Create enums from arrays or objects with full type safety and immutability, with powerful type inference capabilities.

## Installation

```bash
npm install enum8
# or
yarn add enum8
# or
pnpm add enum8
```

## Features

- 🔒 Type-safe enums for TypeScript
- 🚀 Zero dependencies
- 📦 Lightweight and tree-shakeable
- 🧊 Immutable (Object.freeze)
- 💪 Advanced type inference with `infer` property
- 🎯 Compile-time type checking

## Usage

```typescript
import { enumerate } from 'enum8';

// Create an enum from an array (auto-indexed)
const Colors = enumerate(['RED', 'GREEN', 'BLUE']);
// Type: { readonly RED: 0; readonly GREEN: 1; readonly BLUE: 2; infer: 0 | 1 | 2 }
const color: typeof Colors.infer = Colors.RED; // Type-safe: only 0, 1, or 2 allowed

// Create an enum from an object with number values
const Priorities = enumerate({
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
});
// Type: { readonly LOW: 0; readonly MEDIUM: 1; readonly HIGH: 2; infer: 0 | 1 | 2 }
const priority: typeof Priorities.infer = Priorities.HIGH; // Type-safe: only 0, 1, or 2 allowed

// Create an enum from an object with string values
const HttpMethods = enumerate({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
});
// Type: { readonly GET: "GET"; readonly POST: "POST"; readonly PUT: "PUT"; readonly DELETE: "DELETE"; infer: "GET" | "POST" | "PUT" | "DELETE" }
const method: typeof HttpMethods.infer = HttpMethods.GET; // Type-safe: only "GET", "POST", "PUT", "DELETE" allowed

// All enums are immutable
HttpMethods.GET = 'INVALID'; // Error: Cannot assign to 'GET' because it is a read-only property

// Type inference in functions
function handleRequest(method: typeof HttpMethods.infer) {
  // TypeScript knows method can only be "GET", "POST", "PUT", or "DELETE"
  switch (method) {
    case HttpMethods.GET:
      return 'Handling GET request';
    case HttpMethods.POST:
      return 'Handling POST request';
    // ... TypeScript will ensure all cases are handled
  }
}
```

## API Reference

### `enumerate(definition)`

Creates an immutable enum object with full TypeScript type inference.

#### Parameters

One of the following:
- `string[]`: Array of enum keys (values will be numeric indices)
- `Record<string, number>`: Object with string keys and number values
- `Record<string, string>`: Object with string keys and string values

#### Returns

Returns a readonly enum object with an additional `infer` property for type inference:
- For array input: `{ readonly [key: string]: number; infer: number }`
- For object input: `{ readonly [key: string]: T; infer: T }` where T is the value type

#### Type Safety Features

The function provides advanced TypeScript type inference through the `infer` property:

```typescript
const Colors = enumerate(['RED', 'GREEN', 'BLUE']);
type ColorValues = typeof Colors.infer; // type: 0 | 1 | 2

const Methods = enumerate({
  GET: 'GET',
  POST: 'POST'
});
type HttpMethod = typeof Methods.infer; // type: "GET" | "POST"

// Type-safe function parameters
function paint(color: typeof Colors.infer) {
  // TypeScript ensures only valid color values can be passed
}

// Compile-time errors for invalid values
paint(Colors.RED); // OK
paint(3); // Error: Argument of type '3' is not assignable...
```

## Why enum8?

- **Type Safety**: Unlike TypeScript's built-in enums, enum8 provides true type safety with no runtime overhead
- **Value Inference**: The `infer` property makes it easy to use enum values in type annotations
- **Immutability**: All enums are automatically frozen, preventing accidental modifications
- **Simplicity**: No class instances or complex methods, just plain immutable objects
- **Tree Shakeable**: Works perfectly with modern bundlers for optimal dead code elimination

## License

MIT © Dominic Vonk

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 