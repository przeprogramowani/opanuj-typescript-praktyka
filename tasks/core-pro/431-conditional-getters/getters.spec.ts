import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { getAllOrders } from './task.ts';

describe('Conditional Types', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should return all orders', () => {
    const orders = [
      {
        id: 1,
        date: new Date(),
        items: ['Banana', 'Apple', 'Orange'],
      },
    ];

    const client = {
      getOrder: (id: number) => {
        return orders[0];
      },
      getOrders: () => orders,
    };

    const returnedOrders = getAllOrders(client);

    expect(returnedOrders).toEqual(orders);
  });
});
