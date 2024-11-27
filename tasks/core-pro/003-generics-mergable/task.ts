// type MergeableObject<T> = T extends object ? (T extends any[] | Function ? never : T) : never;

// Zaimplementuj typ MergeableObject z wykorzystaniem typów Exclude i NonNullable.
type MergeableObject<T> = T;

export function mergeObjects<T, U>(obj1: MergeableObject<T>, obj2: MergeableObject<U>): T & U {
  const merged = { ...obj1, ...obj2 };
  console.log(merged);
  return merged;
}
