import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renderöi sivulle tekstin ruokapäiväkirja', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Ruokapäiväkirja/i);
  expect(headerElement).toBeInTheDocument();
});
