import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../pages/App';
import AddPage from '../pages/AddPage';
import EntryPage from '../pages/EntryPage';
import ReminderPage from '../pages/ReminderPage';
import SettingsPage from '../pages/SettingsPage';
import PlaygroundPage from '../pages/PlaygroundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'entry',
        element: <EntryPage />,
      },
      {
        path: 'add',
        element: <AddPage />,
      },
      {
        path: 'reminder',
        element: <ReminderPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'playground',
        element: <PlaygroundPage />,
      },
      {
        path: '',
        element: <Navigate to="/entry" />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);

export default router;
