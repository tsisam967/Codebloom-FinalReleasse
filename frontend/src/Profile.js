import React from 'react';

function Profile() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>My Profile</h2>
        <p>Welcome to your profile page.</p>
        <p>You can manage your projects and view updates here.</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: '#f7f9fc',
    minHeight: '85vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: '50px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '600px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#333',
    marginBottom: '20px'
  }
};

export default Profile;
