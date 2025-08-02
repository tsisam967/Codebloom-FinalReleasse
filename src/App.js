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
      <div style={{ backgroundColor: '#f4f6fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavigationBar token={token} onLogout={handleLogout} />

        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/profile" element={token ? <Profile token={token} /> : <Navigate to="/login" />} />
          </Routes>

          {token && (
            <div style={styles.projectSection}>
              <ProjectForm token={token} />
              <ProjectList token={token} />
              <UpdateProject token={token} />
              <DeleteProject token={token} />
            </div>
          )}
        </main>

        <hr style={styles.footerLine} />
        <footer style={styles.footer}>
         © 2025 CodeBloom | Final Project by Tsinat – COMP229

        </footer>
      </div>
    </Router>
  );
}

const styles = {
  mainContent: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    flex: 1,
  },
  projectSection: {
    marginTop: '40px',
  },
  footerLine: {
    border: 'none',
    borderTop: '2px solid black',
    margin: '50px 60px 0',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: '#555',
    fontSize: '14px',
  },
};

export default App;
