import React from 'react';

function Profile() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Profile</h2>
      <p>Welcome to your profile page.</p>
      <p>You can manage your projects and view updates here.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '50px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    margin: '30px auto',
    maxWidth: '600px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#333',
    marginBottom: '20px'
  }
};

export default Profile;
