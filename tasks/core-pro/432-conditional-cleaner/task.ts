export type FieldTypeCleaner<T, K> = {
  [Prop in keyof T]: T[Prop];
};
