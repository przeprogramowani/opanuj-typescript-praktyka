import { glob } from 'glob';
import { compileTask } from './scripts/compile-task.ts';

try {
  const [, , task] = process.argv;

  if (!task) {
    console.error('👉 Przekaż nazwę zadania jako argument, np. "npm run verify type-filtering"');
    process.exit(1);
  }

  const paths = await glob(`tasks/**/${task}`);

  if (paths.length === 0) {
    console.error(`👉 Upewnij się, że zadanie o nazwie "${task}" istnieje`);
    process.exit(1);
  }

  await compileTask(`${paths[0]}/${task}.ts`);
} catch (error) {
  console.error(`\n❌ Nieoczekiwany błąd :(\n\n ${error}`);
  process.exit(1);
}
