interface Message {
  type: MessageType;
}

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}

export class MessageBus {
  private subscribers: any;

  subscribe(type: any, subscriber: (message: any) => void): void {
    throw new Error('Not implemented');
  }

  publish(message: any): void {
    throw new Error('Not implemented');
  }
}

export class InventoryStockTracker {
  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    throw new Error('Not implemented');
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
