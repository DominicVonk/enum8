/**
 * A utility type that parses a string into a number.
 * @internal
 */
type ParseInt<T extends string> = T extends `${number}`
  ? T extends `${infer N extends number}`
    ? N
    : never
  : never;

/**
 * Represents an enumerated type with readonly properties and an inferred value type.
 * @template R The type of the enum object
 */
export type Enumerated<R> = Readonly<R> & { infer: R[keyof R] };

/**
 * Creates an enumerated object from an array of strings, where each string becomes a key mapped to its index.
 * @example
 * ```ts
 * const Colors = enumerate(['RED', 'GREEN', 'BLUE']);
 * Colors.RED; // 0
 * Colors.GREEN; // 1
 * Colors.BLUE; // 2
 * ```
 *
 * @example
 * ```ts
 * const Colors = enumerate({
 *   RED: 'red',
 *   GREEN: 'green',
 *   BLUE: 'blue'
 * });
 * Colors.RED; // 'red'
 * Colors.GREEN; // 'green'
 * Colors.BLUE; // 'blue'
 * ```
 */
export function enumerate<
  const T extends string[],
  const R extends {
    [P in keyof T as T[P] extends `${string}`
      ? `${T[P]}`
      : never]: P extends string ? ParseInt<P> : never;
  }
>(array: T): Enumerated<R>;
/**
 * Creates an enumerated object from a record mapping strings to numbers.
 * @example
 * ```ts
 * const Status = enumerate({
 *   PENDING: 0,
 *   ACTIVE: 1,
 *   INACTIVE: 2
 * });
 * ```
 */
export function enumerate<
  const T extends Record<string, number>,
  const R extends T
>(record: T): Enumerated<R>;
/**
 * Creates an enumerated object from a record mapping strings to strings.
 * @example
 * ```ts
 * const Roles = enumerate({
 *   ADMIN: 'admin',
 *   USER: 'user',
 *   GUEST: 'guest'
 * });
 * ```
 */
export function enumerate<
  const T extends Record<string, string>,
  const R extends T
>(record: T): Enumerated<R>;
export function enumerate<
  const T extends Record<string, string> | Record<string, number> | string[],
  const R extends T extends string[] ? { [P in T[number]]: keyof T } : T
>(record: T): Enumerated<R> {
  if (Array.isArray(record)) {
    return Object.freeze(
      Object.fromEntries(record.map((key, index) => [key, index]))
    ) as Enumerated<R>;
  }
  return Object.freeze(record) as Enumerated<R>;
}
