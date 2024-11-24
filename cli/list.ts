import prompts from 'prompts';
import { glob } from 'glob';
import { compileTask } from './scripts/compile-task.ts';

const [, , courseName] = process.argv;

if (!courseName) {
  console.error('👉 Przekaż nazwę modułu, np. "npm run list core-pro"');
  process.exit(1);
}

const coursePath = `tasks/${courseName}/*`;

try {
  const folders = await glob(coursePath);

  if (folders.length === 0) {
    console.error(`👉 Nie znaleziono modułu o nazwie "${courseName}"`);
    process.exit(1);
  }

  const taskNames = folders.map((folder) => folder.split('/').pop()) as string[];

  const { task } = await prompts({
    type: 'select',
    name: 'task',
    message: '🔍 Wybierz zadanie do weryfikacji:',
    choices: taskNames.map((task) => ({ title: task, value: task })),
  });

  await compileTask(`tasks/${courseName}/${task}/${task}.ts`);
} catch (error) {
  console.error(`\n❌ Nieoczekiwany błąd :(\n\n ${error}`);
  process.exit(1);
}
