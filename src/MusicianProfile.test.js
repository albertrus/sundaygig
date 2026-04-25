import { render, screen, fireEvent } from '@testing-library/react';
import MusicianProfile from './MusicianProfile';

test('renders form fields in edit mode', () => {
  render(<MusicianProfile />);
  expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Tell the world/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Add a skill/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^0$/)).toBeInTheDocument();
});

test('adds a skill tag when Add button is clicked', () => {
  render(<MusicianProfile />);
  const skillInput = screen.getByLabelText(/Skill input/i);
  fireEvent.change(skillInput, { target: { value: 'Guitar' } });
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('Guitar')).toBeInTheDocument();
});

test('adds a skill tag when Enter key is pressed', () => {
  render(<MusicianProfile />);
  const skillInput = screen.getByLabelText(/Skill input/i);
  fireEvent.change(skillInput, { target: { value: 'Drums' } });
  fireEvent.keyDown(skillInput, { key: 'Enter', code: 'Enter' });
  expect(screen.getByText('Drums')).toBeInTheDocument();
});

test('removes a skill tag when × is clicked', () => {
  render(<MusicianProfile />);
  const skillInput = screen.getByLabelText(/Skill input/i);
  fireEvent.change(skillInput, { target: { value: 'Bass' } });
  fireEvent.click(screen.getByText('Add'));
  const removeBtn = screen.getByLabelText(/Remove skill Bass/i);
  fireEvent.click(removeBtn);
  expect(screen.queryByText('Bass')).not.toBeInTheDocument();
});

test('saves profile and displays view mode', () => {
  render(<MusicianProfile />);
  const nameInput = screen.getByPlaceholderText(/Your Name/i);
  fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
  fireEvent.click(screen.getByText('Save Profile'));
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  expect(screen.getByText('Edit Profile')).toBeInTheDocument();
});

test('shows alert when saving without a name', () => {
  window.alert = jest.fn();
  render(<MusicianProfile />);
  fireEvent.click(screen.getByText('Save Profile'));
  expect(window.alert).toHaveBeenCalledWith(
    'Please enter your name before saving.'
  );
});

test('switches back to edit mode after clicking Edit Profile', () => {
  render(<MusicianProfile />);
  const nameInput = screen.getByPlaceholderText(/Your Name/i);
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.click(screen.getByText('Save Profile'));
  fireEvent.click(screen.getByText('Edit Profile'));
  expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
});

test('displays price per gig in view mode', () => {
  render(<MusicianProfile />);
  const nameInput = screen.getByPlaceholderText(/Your Name/i);
  fireEvent.change(nameInput, { target: { value: 'Alice' } });
  const priceInput = screen.getByLabelText(/Price per gig/i);
  fireEvent.change(priceInput, { target: { value: '200' } });
  fireEvent.click(screen.getByText('Save Profile'));
  expect(screen.getByText(/\$200\s*\/\s*gig/)).toBeInTheDocument();
});
