import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoutes";
import ActivityLogs from "./pages/ActivityLogs";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/activity-logs"
          element={
            <PrivateRoute>
              <MainLayout>
                <ActivityLogs />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
