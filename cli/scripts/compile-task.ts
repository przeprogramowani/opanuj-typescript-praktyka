import { execa } from 'execa';

function getTaskName(pathToTask: string) {
  return pathToTask.split('/').pop();
}

export async function compileTask(pathToTask: string) {
  try {
    console.log(`\n👉 Sprawdzam zadanie "${pathToTask}"...`);
    await execa`tsc ${pathToTask} --noEmit --strict`;
    console.log(`\n✅ Gratulacje! Zadanie "${getTaskName(pathToTask)}" zaliczone!`);
  } catch (error) {
    console.error(`\n❌ Coś poszło nie tak :( \n\n`);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
