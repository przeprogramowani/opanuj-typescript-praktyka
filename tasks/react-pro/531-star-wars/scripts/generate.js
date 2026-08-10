import { generate } from 'orval';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const configPath = join(dirname(fileURLToPath(import.meta.url)), 'orval.config.ts');

try {
  await generate(configPath);
} catch (error) {
  console.error('❌ Nie udało się wygenerować klienta (dodaj wątek na O:TS Forum):', error.message);
  process.exit(1);
}
