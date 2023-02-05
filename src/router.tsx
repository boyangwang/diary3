import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AddPage from "./pages/AddPage";
import EntryPage from "./pages/EntryPage";
import ReminderPage from "./pages/ReminderPage";
import SettingsPage from "./pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "entry",
        element: <EntryPage />,
      }, {
        path: "add",
        element: <AddPage />,
      }, {
        path: "reminder",
        element: <ReminderPage />,
      }, {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
