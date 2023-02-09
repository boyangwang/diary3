import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from './App';
import React from 'react';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );

  expect(screen.getByText(/Diary/i)).toBeInTheDocument();
});

test('login logout', () => {
  // render();
});
