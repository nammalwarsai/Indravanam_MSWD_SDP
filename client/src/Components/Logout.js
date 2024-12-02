import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Clear authentication state
    navigate('/login'); // Redirect to the login page
  };

  return (
    <button onClick={handleLogout} style={{ margin: '20px', padding: '10px', background: '#ff5252', color: '#fff', border: 'none', borderRadius: '5px' }}>
      Logout
    </button>
  );
};

export default Logout;
