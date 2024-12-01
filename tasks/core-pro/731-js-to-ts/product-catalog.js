import { readFileSync } from 'fs';

export function getProductCatalog() {
  return JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
}
