import { expect } from 'vitest';

expect.extend({
  toConfirmCompilation(received: string[]) {
    const { isNot } = this;
    return {
      pass: received.length === 0,
      message: () =>
        isNot
          ? '\n🚨 Oczekiwano błędów kompilacji - upewnij się, że typy są odpowiednio zdefiniowane.'
          : `\n🚨 Wykryto następujące błędy kompilacji:\n\n${received.join('\n')}\n`,
    };
  },
});
