import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';
import Home from './Home';
import Profile from './Profile';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <NavigationBar token={token} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/profile" element={token ? <Profile token={token} /> : <Navigate to="/login" />} />
        </Routes>

        {token && (
          <div style={{ marginTop: '30px' }}>
            <ProjectForm token={token} />
            <ProjectList token={token} />
            <UpdateProject token={token} />
            <DeleteProject token={token} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
