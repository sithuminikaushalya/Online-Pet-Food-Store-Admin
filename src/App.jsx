import React, { useState, useEffect } from 'react';
import Navbar from './componets/Navbar/Navbar';
import Sidebar from './componets/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLoginPopup from './componets/AdminLoginPopup/AdminLoginPopup'; // Import the AdminLoginPopup component
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProtectedRoute from './componets/ProtectedRoute/ProtectedRoute';
const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const url = "http://localhost:4000";
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      setShowAdminLogin(true);
    } else {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLogin = (adminData) => {
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
    navigate('/orders'); // Redirect to /orders after login
  };

  if (showAdminLogin) {
    return <AdminLoginPopup setShowAdminLogin={setShowAdminLogin} onAdminLogin={handleAdminLogin} />;
  }

 return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route
            path="/add"
            element={
              <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
                <Add url={url} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
                <List url={url} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
                <Orders url={url} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;