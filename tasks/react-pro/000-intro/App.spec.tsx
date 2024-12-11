import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.tsx';

test('renders intro App', async () => {
  // Setup userEvent
  const user = userEvent.setup();

  // Render the component
  render(<App />);

  // Check initial state
  expect(screen.getByText('Current count: 0')).toBeInTheDocument();

  // Click the button
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  await user.click(incrementButton);

  // Check updated state
  expect(screen.getByText('Current count: 1')).toBeInTheDocument();
});
