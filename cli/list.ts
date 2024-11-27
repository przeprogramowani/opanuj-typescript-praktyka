import { Command } from 'commander';
import { glob } from 'glob';
import prompts from 'prompts';
import { startTest } from './scripts/test-runner';

const program = new Command();

program
  .name('list')
  .description('Uruchamianie zadań z wybranego modułu')
  .argument('[course]', 'Nazwa modułu', 'core-pro')
  .action(async (course: string) => {
    try {
      const coursePath = `tasks/${course}/*`;
      const folders = await glob(coursePath);

      if (folders.length === 0) {
        console.error(`👉 Nie znaleziono modułu o nazwie "${course}"`);
        process.exit(1);
      }

      const taskNames = folders.map((folder) => folder.split('/').pop()) as string[];
      const choices = taskNames
        .map((task) => ({ title: task, value: task }))
        .sort((a, b) => a.title.localeCompare(b.title));

      const { task } = await prompts({
        type: 'select',
        name: 'task',
        message: '🔍 Wybierz zadanie do weryfikacji:',
        choices,
      });

      await startTest(`tasks/${course}/${task}`);
    } catch (error) {
      console.error(`\n❌ Nieoczekiwany błąd :(\n\n ${error}`);
      process.exit(1);
    }
  });

program.parse();
