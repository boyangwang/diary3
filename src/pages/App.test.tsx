import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import React from 'react';
import App from 'src/pages/App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

test('renders Diary title', () => {
  jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useMatches: jest.fn().mockReturnValue([{ pathname: '/entry11' }]),
    useLocation: jest.fn().mockReturnValue({ pathname: '/entry11' }),
  }));

  const routes = [
    {
      path: '/entry',
      element: <App />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/entry'],
  });

  render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );

  expect(screen.getByText(/Not logged in/i)).toBeInTheDocument();
});
