import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Codebloomlogo.png'; // Make sure the logo file is in your src folder

function NavigationBar({ token, onLogout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="CodeBloom Logo" style={styles.logo} />
        <span style={styles.title}>CodeBloom</span>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {token ? (
          <>
            <Link to="/profile" style={styles.link}>My Profile</Link>
            <button onClick={onLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" style={styles.link}>Signup</Link>
            <Link to="/login" style={styles.link}>Login</Link>
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
    alignItems: 'center'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logo: {
    height: '30px',
    width: '30px',
    objectFit: 'contain'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    gap: '15px'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  button: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    cursor: 'pointer'
  }
};

export default NavigationBar;
