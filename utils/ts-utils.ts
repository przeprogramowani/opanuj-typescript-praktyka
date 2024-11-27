import { createProgram, getPreEmitDiagnostics, ModuleKind, ModuleResolutionKind, ScriptTarget } from 'typescript';

export function getDiagnostics(pathToFile: string): string[] {
  const program = createProgram([pathToFile], {
    target: ScriptTarget.ESNext,
    module: ModuleKind.NodeNext,
    moduleResolution: ModuleResolutionKind.NodeNext,
    noEmit: true,
    types: ['node'],
    allowImportingTsExtensions: true,
  });
  const diagnostics = getPreEmitDiagnostics(program);
  return diagnostics.map((diagnostic) => diagnostic.messageText) as string[];
}
