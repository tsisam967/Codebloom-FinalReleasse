import React, { useEffect, useState } from 'react';
import DeletePopup from './DeletePopup'; 

function ProjectList({ token }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/projects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setProjects(data);
        } else {
          setError(data.message || 'Failed to load projects.');
        }

      } catch (err) {
        setError('Error fetching projects.');
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token]);

  const handleDeleteClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/projects/${selectedProjectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProjects(projects.filter(project => project._id !== selectedProjectId));
      } else {
        setError('Failed to delete project.');
      }
    } catch (err) {
      setError('Error deleting project.');
    }
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Your Projects</h2>
      {error && <p>{error}</p>}
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <strong>{project.title}</strong><br />
              {project.description}<br />
              <button onClick={() => handleDeleteClick(project._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {showPopup && (
        <DeletePopup
          onConfirm={confirmDelete}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default ProjectList;
