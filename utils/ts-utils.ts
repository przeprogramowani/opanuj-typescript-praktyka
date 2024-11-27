import {
  createProgram,
  DiagnosticCategory,
  getPreEmitDiagnostics,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget,
} from 'typescript';

export function getCompilationErrors(pathToFile: string): string[] {
  const program = createProgram([pathToFile], {
    target: ScriptTarget.ESNext,
    module: ModuleKind.NodeNext,
    moduleResolution: ModuleResolutionKind.NodeNext,
    noEmit: true,
    strict: true,
    types: ['node'],
    allowImportingTsExtensions: true,
  });
  const diagnostics = getPreEmitDiagnostics(program);
  return diagnostics
    .filter((diagnostic) => diagnostic.category === DiagnosticCategory.Error)
    .map((diagnostic) => diagnostic.messageText) as string[];
}
