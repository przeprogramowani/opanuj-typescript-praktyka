import { defineConfig } from 'orval';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Ścieżki liczone względem tego pliku, dzięki czemu generator działa
// niezależnie od katalogu, z którego go uruchomisz.
const here = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  swapi: {
    output: {
      client: 'react-query',
      target: join(here, '../generated/swapi-client.ts'),
      mode: 'split',
      mock: false,
      baseUrl: 'https://swapi.dev/api',
    },
    input: {
      target: join(here, 'schema-sw.yml'),
    },
  },
  dalle: {
    output: {
      client: 'react-query',
      target: join(here, '../generated/dalle-client.ts'),
      mode: 'split',
      mock: false,
      baseUrl: 'https://api.openai.com/v1',
    },
    input: {
      target: join(here, 'schema-dalle.yml'),
    },
  },
});
