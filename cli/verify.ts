import { Command } from 'commander';
import { glob } from 'glob';
import { startTest } from './scripts/test-runner.ts';

const program = new Command();

program
  .name('verify')
  .description('Weryfikacja zadania')
  .argument('<task>', 'Nazwa zadania do weryfikacji')
  .option('-w, --watch', 'Uruchamia testy w trybie obserwatora', false)
  .action(async (task, options: { watch: boolean }) => {
    try {
      const paths = await glob(`tasks/**/${task}`);
      const taskWithoutNumber = task.replace(/^\d+-/, '');
      const alternativePaths = await glob(`tasks/**/*-${taskWithoutNumber}`);

      const allPaths = [...new Set([...paths, ...alternativePaths])];

      if (allPaths.length === 0) {
        console.error(
          `👉 Upewnij się, że zadanie o nazwie "${task}" lub "*-${taskWithoutNumber}" istnieje`,
        );
        process.exit(1);
      }

      await startTest(`${allPaths[0]}`, { watch: options.watch });
    } catch (error) {
      console.error(`\n❌ Nieoczekiwany błąd :(\n\n ${error}`);
      process.exit(1);
    }
  });

program.parse();
