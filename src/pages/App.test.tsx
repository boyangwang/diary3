import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import React from 'react';
import App from 'src/pages/App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

test('renders Diary title', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useMatches: jest.fn().mockReturnValue([{ pathname: '/setting' }]),
    useLocation: jest.fn().mockReturnValue({ pathname: '/setting' }),
  }));

  const routes = [
    {
      path: '/setting',
      element: <App />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/setting'],
  });

  render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  );

  // expect(screen.getByText(/Not logged in, Let's Get Started/i)).toBeInTheDocument();
});
