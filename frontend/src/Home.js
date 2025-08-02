import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to CodeBloom</h1>
      <p style={styles.description}>
        Your personal project tracker made simple.
        <br />
        Sign up to get started or log in to manage your projects.
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#555',
  },
};

export default Home;
