import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import packageJson from '../../../../package.json';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import React from 'react';
import HeaderUser from './HeaderUser';
import { LoginUserInitialState } from 'src/app/login-user-slice';

test('renders not logged in', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <HeaderUser loginUser={LoginUserInitialState} />
      </Provider>
    </React.StrictMode>,
  );

  expect(screen.getByText("Not logged in, Let's Get Started")).toBeInTheDocument();
});

test('renders logged in', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const loginUser = Object.assign({}, LoginUserInitialState, {
    uid: 'test',
    loginTime: +Date.now(),
    lastUseTime: +Date.now(),
    githubSecret: 'github_pat_11A',
    repo: 'diary-data',
    email: 'test@proton.me',
  });

  render(
    <React.StrictMode>
      <Provider store={store}>
        <HeaderUser loginUser={loginUser} />
      </Provider>
    </React.StrictMode>,
  );

  expect(screen.getByText(/Diary/i)).toBeInTheDocument();
  expect(screen.getByText(`v${packageJson.version}`)).toBeInTheDocument();
});
