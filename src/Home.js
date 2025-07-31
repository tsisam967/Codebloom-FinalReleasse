import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to CodeBloom</h1>
      <p>Your personal project tracker made simple.</p>
      <p>Sign up to get started or log in to manage your projects.</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  }
};

export default Home;
