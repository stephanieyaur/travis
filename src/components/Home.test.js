import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
// import Home from './components/Home';
import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

test('Home.js builds', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/Eligible for medical furlough/i);
  expect(linkElement).toBeInTheDocument();
});
