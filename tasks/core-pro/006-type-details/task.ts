/* Zmień sposób upewnienia się, że obiekt shapes jest zgodny z typem Record<string, Shape>
  Tak aby utrzymać szczegółowe informacje o obiektach przy odwoływaniu się do nich.
*/

type Rectangle = { kind: 'rectangle'; width: number; height: number };
type Circle = { kind: 'circle'; radius: number };
type Shape = Rectangle | Circle;

const shapes: Record<string, Shape> = {
  shape1: { kind: 'rectangle', width: 10, height: 20 },
  shape2: { kind: 'circle', radius: 15 },
};

console.log(shapes.shape1.width);
