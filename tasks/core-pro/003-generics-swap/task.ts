function swapNumbers(a: number, b: number): [number, number] {
  return [b, a];
}

function swapStrings(a: string, b: string): [string, string] {
  return [b, a];
}

export function swap(a, b) {
  throw new Error('Not implemented');
}

const [n1, n2] = swapNumbers(10, 20);
const [s1, s2] = swapStrings('hello', 'world');
const [x, y] = swap(false, true);
