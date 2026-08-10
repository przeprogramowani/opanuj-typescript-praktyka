import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const testModule = process.argv[2];

if (testModule !== 'core' && testModule !== 'react') {
  console.error('Usage: node cli/scripts/report-runner.js <core|react>');
  process.exit(1);
}

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');
const outputFile = join(repositoryRoot, `utils/progress/data/results-${testModule}.json`);
const configFile = join(
  repositoryRoot,
  testModule === 'core' ? 'vitest.config.node.ts' : 'vitest.config.react.ts',
);
const vitestBin = join(repositoryRoot, 'node_modules/vitest/vitest.mjs');

mkdirSync(dirname(outputFile), { recursive: true });
rmSync(outputFile, { force: true });

const result = spawnSync(
  process.execPath,
  [
    vitestBin,
    `${testModule}-pro`,
    '--run',
    '--silent',
    `--config=${configFile}`,
    '--no-coverage',
    '--pool=forks',
    '--reporter=json',
    `--outputFile=${outputFile}`,
  ],
  {
    cwd: repositoryRoot,
    stdio: 'inherit',
  },
);

if (result.error) {
  console.error(`Nie udało się uruchomić Vitesta: ${result.error.message}`);
  process.exit(1);
}

if (!existsSync(outputFile)) {
  console.error('Vitest nie utworzył raportu JSON.');
  process.exit(result.status || 1);
}

try {
  const report = JSON.parse(readFileSync(outputFile, 'utf8'));

  if (!Array.isArray(report.testResults)) {
    throw new Error('brak tablicy testResults');
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Vitest utworzył nieprawidłowy raport JSON: ${message}`);
  process.exit(1);
}

// Czerwone testy są oczekiwanym stanem nieukończonych ćwiczeń. Sam raport jest
// sukcesem, jeśli Vitest wystartował i zapisał kompletny, możliwy do odczytu JSON.
process.exit(0);
