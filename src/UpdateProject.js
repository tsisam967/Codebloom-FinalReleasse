import React, { useState, useEffect } from 'react';
import './ProjectStyles.css';

function UpdateProject({ token }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://codebloom-backend.onrender.com/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setMessage('Failed to load projects.');
      }
    };

    if (token) fetchProjects();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://codebloom-backend.onrender.com/projects/${selectedProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Project updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update.');
      }
    } catch (err) {
      setMessage('Error occurred.');
    }
  };

  return (
    <div className="card-form">
      <h2 className="form-title">Update a Project</h2>
      <form onSubmit={handleUpdate}>
        <label>Select Project:</label>
        <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
          <option value="">--Select--</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>{proj.title}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="New description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="action-button">Update Project</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default UpdateProject;
