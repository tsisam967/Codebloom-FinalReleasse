import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Codebloomlogo.png';

function NavigationBar({ token, onLogout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.leftSection}>
        <img src={logo} alt="CodeBloom Logo" style={styles.logo} />
        <span style={styles.logoText}>CodeBloom</span>
      </div>

      <div style={styles.links}>
        <Link to="/" className="nav-link">Home</Link>

        {token ? (
          <>
            <Link to="/profile" className="nav-link">My Profile</Link>
            <button onClick={onLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#222',
    padding: '10px 20px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '35px',
    marginRight: '10px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
};

export default NavigationBar;
