import React, { useState } from 'react';
import './AlertBox.css'; // Import your CSS file

const Alert = ({ title, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeAlert = () => {
    setIsVisible(false);
  };

  return (
    <div className={`alert-box ${isVisible ? 'visible' : 'hidden'}`}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={closeAlert}>OK</button>
    </div>
  );
};

export default Alert;