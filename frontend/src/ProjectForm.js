import React, { useState } from 'react';
import './Login.css'; 

function ProjectForm({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://codebloom-backend.onrender.com/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title, description })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Project created successfully!');
        setTitle('');
        setDescription('');
      } else {
        setMessage(data.message || 'Failed to create project.');
      }

    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleCreate}>
        <h2>Create New Project</h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ resize: 'vertical', minHeight: '80px' }}
        ></textarea>

        <button type="submit">Create Project</button>

        <p className="login-message">{message}</p>
      </form>
    </div>
  );
}

export default ProjectForm;
