import path from 'path';
import {
  CompilerOptions,
  createProgram,
  DiagnosticCategory,
  getPreEmitDiagnostics,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

const getTsConfig = (searchPath?: string): CompilerOptions => {
  // Try to find tsconfig in the file's directory first
  let configPath = searchPath
    ? path.resolve(path.dirname(searchPath), 'tsconfig.json')
    : path.resolve(process.cwd(), 'tsconfig.json');

  // If local tsconfig doesn't exist, fall back to root tsconfig
  if (searchPath && !sys.fileExists(configPath)) {
    configPath = path.resolve(process.cwd(), 'tsconfig.json');
  }

  const { config, error } = readConfigFile(configPath, sys.readFile);

  if (error) {
    throw new Error(`Failed to read tsconfig.json: ${error.messageText}`);
  }

  const { options } = parseJsonConfigFileContent(config, sys, path.dirname(configPath));

  return options;
};

export function getCompilerDiagnostics(pathToFile: string, inlineOptions?: CompilerOptions): string[] {
  const tsConfigOptions = getTsConfig(pathToFile);
  const program = createProgram([pathToFile], {
    ...tsConfigOptions,
    ...inlineOptions,
  });
  const diagnostics = getPreEmitDiagnostics(program);
  return diagnostics
    .filter((diagnostic) => diagnostic.category === DiagnosticCategory.Error)
    .map((diagnostic) => {
      if (typeof diagnostic.messageText === 'string') {
        return diagnostic.messageText;
      }
      return diagnostic.messageText.messageText;
    });
}
