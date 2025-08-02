import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupForm from './SignupForm';
import '@testing-library/jest-dom';

test('renders SignupForm with heading', () => {
  render(<SignupForm />);
  const heading = screen.getByText(/Signup to CodeBloom/i);
  expect(heading).toBeInTheDocument();
});
