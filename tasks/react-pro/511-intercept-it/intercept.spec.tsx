import { act } from 'react';
import { join } from 'path';
import { describe, test } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';
import App from './App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupMockServer } from '../../../utils/vitest/msw';

describe('Axios Interceptor', () => {
  const { verifyRequest } = setupMockServer();

  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });

  test('does not call tracker API when request is immediate', async () => {
    render(<App />);
    const searchButton = screen.getByTestId('search-button-new');
    await act(async () => {
      await userEvent.click(searchButton);
    });
    expect(verifyRequest('http://localhost:3000/api/tracker', 'POST')).toBe(false);
  });

  test('calls tracker API when request takes 5 seconds', async () => {
    render(<App />);
    const searchButton = screen.getByTestId('search-button-legacy');
    await act(async () => {
      await userEvent.click(searchButton);
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(verifyRequest('http://localhost:3000/api/tracker', 'POST')).toBe(true);
  });
});
