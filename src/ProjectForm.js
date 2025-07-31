import React, { useState } from 'react';

function ProjectForm({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title, description })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(' Project created successfully!');
        setTitle('');
        setDescription('');
      } else {
        setMessage(data.message || 'Failed to create project.');
      }

    } catch (err) {
      setMessage(' Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea><br />
        <button type="submit">Create Project</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ProjectForm;
