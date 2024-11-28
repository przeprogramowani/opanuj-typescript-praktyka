import { glob } from 'glob';
import { startTest } from './scripts/test-runner.ts';
import { Command } from 'commander';

const program = new Command();

program
  .name('verify')
  .description('Weryfikacja zadania')
  .argument('<task>', 'Nazwa zadania do weryfikacji')
  .action(async (task) => {
    try {
      const paths = await glob(`tasks/**/${task}`);

      if (paths.length === 0) {
        console.error(`👉 Upewnij się, że zadanie o nazwie "${task}" istnieje`);
        process.exit(1);
      }

      await startTest(`${paths[0]}`);
    } catch (error) {
      console.error(`\n❌ Nieoczekiwany błąd :(\n\n ${error}`);
      process.exit(1);
    }
  });

program.parse();
