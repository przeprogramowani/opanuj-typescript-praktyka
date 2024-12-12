import { Command } from 'commander';
import { glob } from 'glob';
import { startTest } from './scripts/test-runner.ts';

function suppressViteSourceMapWarning(callback: () => Promise<void>) {
  const stderrWrite = process.stderr.write;
  process.stderr.write = function (chunk: any, ...args: any[]) {
    const output = chunk.toString();
    if (output.includes('Failed to load source map') || output.includes('ENOENT')) {
      return true;
    }
    return stderrWrite.call(process.stderr, chunk, ...args.slice(0, 2));
  };

  return callback().finally(() => {
    // Restore original stderr
    process.stderr.write = stderrWrite;
  });
}

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
          `� Upewnij się, że zadanie o nazwie "${task}" lub "*-${taskWithoutNumber}" istnieje`,
        );
        process.exit(1);
      }

      // Wrap the test execution with the suppression function
      await suppressViteSourceMapWarning(() =>
        startTest(`${allPaths[0]}`, { watch: options.watch }),
      );
    } catch (error) {
      console.error(`\n❌ Nieoczekiwany błąd :(\n\n ${error}`);
      process.exit(1);
    }
  });

program.parse();
