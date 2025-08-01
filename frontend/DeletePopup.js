import React from 'react';

const DeletePopup = ({ onConfirm, onCancel }) => {
  return (
    <div style={popupStyle}>
      <p>Are you sure you want to delete this project?</p>
      <button onClick={onConfirm}>Yes, Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

const popupStyle = {
  position: 'fixed',
  top: '40%',
  left: '35%',
  backgroundColor: 'white',
  padding: '20px',
  border: '2px solid black',
  zIndex: 1000
};

export default DeletePopup;
