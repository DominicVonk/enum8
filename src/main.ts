type ParseInt<T extends string> = T extends `${number}`
  ? T extends `${infer N extends number}`
    ? N
    : never
  : never;

type Inferable<R> = Readonly<R> & { infer: R[keyof R] };

export function enumerate<
  const T extends string[],
  const R extends {
    [P in keyof T as T[P] extends `${string}`
      ? `${T[P]}`
      : never]: P extends string ? ParseInt<P> : never;
  }
>(array: T): Inferable<R>;
export function enumerate<
  const T extends Record<string, number>,
  const R extends T
>(record: T): Inferable<R>;
export function enumerate<
  const T extends Record<string, string>,
  const R extends T
>(record: T): Inferable<R>;
export function enumerate<
  const T extends Record<string, string> | Record<string, number> | string[],
  const R extends T extends string[] ? { [P in T[number]]: keyof T } : T
>(record: T): Inferable<R> {
  if (Array.isArray(record)) {
    return Object.freeze(
      Object.fromEntries(record.map((key, index) => [key, index]))
    ) as Inferable<R>;
  }
  return Object.freeze(record) as Inferable<R>;
}
