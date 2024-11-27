import { mergeObjects } from './task.ts';

mergeObjects({ hello: 'world' }, { foo: 'bar' });
mergeObjects({ a: 1 }, { b: 2 });
mergeObjects({ length: 20 }, {});
