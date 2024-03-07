import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { RouterProvider } from 'react-router-dom';
import router from './app/router';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/global.less';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <StrictMode>

  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </QueryClientProvider>
  </Provider>,
  // </StrictMode>,
);
