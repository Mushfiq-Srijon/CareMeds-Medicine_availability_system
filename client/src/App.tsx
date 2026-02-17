import { Outlet, Route, Routes } from 'react-router-dom';
import BaseLayout from './views/BaseLayout';
import Home from './views/Home';

// NEW IMPORTS
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <BaseLayout>
              <Outlet />
            </BaseLayout>
          }
        >
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Home Page */}
          <Route path="/home" element={<Home />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          error: { duration: 5000 },
        }}
      />
    </>
  );
}

export default App;
