import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import { render, screen } from '@testing-library/react';
import { setupMockServer } from '../../../utils/vitest/msw';
import App from './App';

describe('Star Wars App', () => {
  const { verifyRequest } = setupMockServer();

  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('should fetch initial batch of starships', async () => {
    render(<App />);

    expect(verifyRequest('https://swapi.dev/api/starships?page=1', 'GET')).toBe(true);
    expect(screen.getAllByTestId('starship-card')).toHaveLength(1);
  });
});
