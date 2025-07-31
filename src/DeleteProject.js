import React, { useState, useEffect } from 'react';

function DeleteProject({ token }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:4000/projects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setMessage('Failed to load projects.');
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/projects/${selectedProjectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(' Project deleted successfully!');
        // Refresh list
        setProjects(projects.filter(p => p._id !== selectedProjectId));
        setSelectedProjectId('');
      } else {
        setMessage(data.message || 'Failed to delete project.');
      }
    } catch (err) {
      setMessage(' Error occurred.');
    }
  };

  return (
    <div>
      <h2>Delete a Project</h2>
      <form onSubmit={handleDelete}>
        <label>Select a project to delete:</label><br />
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          <option value="">--Select--</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>
              {proj.title}
            </option>
          ))}
        </select><br /><br />
        <button type="submit">Delete</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default DeleteProject;
