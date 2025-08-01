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
        const response = await fetch('https://codebloom-backend.onrender.com/projects', {
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
      const response = await fetch(`https://codebloom-backend.onrender.com/projects/${selectedProjectId}`, {
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
    <div style={styles.container}>
      <h2>Your Projects</h2>
      {error && <p style={styles.error}>{error}</p>}
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul style={styles.list}>
          {projects.map((project) => (
            <li key={project._id} style={styles.item}>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
              <button onClick={() => handleDeleteClick(project._id)} style={styles.button}>
                Delete
              </button>
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

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  error: {
    color: 'red'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  item: {
    backgroundColor: '#f9f9f9',
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '6px'
  },
  button: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default ProjectList;
