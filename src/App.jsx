
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';

import Dashboard from './pages/Dashboard.jsx';
import TaskManager from './pages/TaskManager.jsx';
import ExpiryTracker from './pages/ExpiryTracker.jsx';
import ResourceSharing from './pages/ResourceSharing.jsx';
import Profile from './pages/Profile.jsx';
import Notifications from './pages/Notifications.jsx';

function App() {
  return (
    <div className="min-h-screen bg-green-50">

      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar and Main Content */}
      <div className="flex min-h-screen">

        <Sidebar />

        <main className="flex-1 min-w-0 p-4 md:p-6">

          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/expiry" element={<ExpiryTracker />} />
            <Route path="/sharing" element={<ResourceSharing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>

        </main>

      </div>
    </div>
  );
}

export default App;
