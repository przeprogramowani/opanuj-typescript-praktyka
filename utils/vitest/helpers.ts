import type { MatcherState } from '@vitest/expect';
import fs from 'fs';
import path from 'path';
import type { File, Suite } from 'vitest';

export function toConfirmCompilation(this: MatcherState, received: string[]) {
  const { isNot } = this;
  return {
    pass: received.length === 0,
    message: () =>
      isNot
        ? '\n🚨 Oczekiwano błędów kompilacji - upewnij się, że typy są odpowiednio zdefiniowane.'
        : `\n🚨 Wykryto następujące błędy kompilacji:\n\n${received.join('\n')}\n`,
  };
}

export function trackVerify(testModule: 'core' | 'react', suite: Readonly<Suite | File>) {
  try {
    // Skip tracking if we are running raport summary
    if (process.env.npm_lifecycle_event?.includes('raport:')) {
      return;
    }

    const trackerPath = path.join(process.cwd(), 'utils/progress/data/verify-tracker.json');

    // Katalog `data` jest w .gitignore, więc po świeżym klonie może nie istnieć
    fs.mkdirSync(path.dirname(trackerPath), { recursive: true });

    // Create tracker file if it doesn't exist
    if (!fs.existsSync(trackerPath)) {
      fs.writeFileSync(
        trackerPath,
        JSON.stringify(
          {
            core: {},
            react: {},
          },
          null,
          2,
        ),
      );
    }

    // Read and parse the tracker file
    const tracker = JSON.parse(fs.readFileSync(trackerPath, 'utf8'));

    // Get the current test file name from the suite (Vitest 4 przekazuje suite jako 2. argument hooka)
    const testFile = suite.file ?? (suite as File);
    const testName = testFile.name
      .split('/')
      .pop()
      ?.replace(/\.spec\.tsx?$/, '');

    if (testName && !tracker[testModule][testName]) {
      tracker[testModule][testName] = true;

      // Write back to the tracker file
      fs.writeFileSync(trackerPath, JSON.stringify(tracker, null, 2));
    }
  } catch (error) {
    console.error('Error updating tracker file:', error);
  }
}
