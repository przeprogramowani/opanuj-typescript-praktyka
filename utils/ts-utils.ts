import {
  createProgram,
  CompilerOptions,
  DiagnosticCategory,
  getPreEmitDiagnostics,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
} from 'typescript';

const DEFAULT_COMPILER_OPTIONS: CompilerOptions = {
  target: ScriptTarget.ESNext,
  module: ModuleKind.NodeNext,
  moduleResolution: ModuleResolutionKind.NodeNext,
  noEmit: true,
  strict: true,
  types: ['node'],
  allowImportingTsExtensions: true,
};

export function getCompilerDiagnostics(pathToFile: string, options?: CompilerOptions): string[] {
  const program = createProgram([pathToFile], { ...DEFAULT_COMPILER_OPTIONS, ...options });
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
