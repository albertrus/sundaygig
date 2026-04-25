import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SundayGig header', () => {
  render(<App />);
  const titleElement = screen.getByText(/SundayGig/i);
  expect(titleElement).toBeInTheDocument();
});
