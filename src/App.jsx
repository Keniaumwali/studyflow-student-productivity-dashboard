
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import SettingsPage from "./pages/SettingsPage";
import FocusTimer from "./components/FocusTimer";
import { initialTasks } from "./data/initialTasks";
import useLocalStorage from "./hooks/useLocalStorage";

function NotFoundPage() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-bold text-slate-900">404</h1>

      <p className="mt-3 text-slate-500">
        Sorry, this page could not be found.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-teal-500 px-5 py-3 text-white hover:bg-teal-600"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useLocalStorage(
    "studyflow-tasks",
    initialTasks
  );

  return (
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route
            path="/"
            element={<DashboardPage tasks={tasks} />}
          />

          <Route
            path="/tasks"
            element={
              <TasksPage tasks={tasks} setTasks={setTasks} />
            }
          />

          <Route
            path="/focus"
            element={<FocusTimer />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
}

export default App;
