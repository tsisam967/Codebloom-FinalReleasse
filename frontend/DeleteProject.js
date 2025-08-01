import React, { useState, useEffect } from 'react';
import './ProjectStyles.css';

function DeleteProject({ token }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://codebloom-finalreleasse.onrender.com/projects', {
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://codebloom-finalreleasse.onrender.com/projects/${selectedProjectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Project deleted successfully!');
        setProjects(projects.filter((p) => p._id !== selectedProjectId));
        setSelectedProjectId('');
      } else {
        setMessage(data.message || 'Failed to delete project.');
      }
    } catch (err) {
      setMessage('Error occurred.');
    }
  };

  return (
    <div className="card-form">
      <h2 className="form-title">Delete a Project</h2>
      <form onSubmit={handleDelete}>
        <label>Select a project to delete:</label>
        <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
          <option value="">--Select--</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>{proj.title}</option>
          ))}
        </select>
        <button type="submit" className="action-button">Delete</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default DeleteProject;
