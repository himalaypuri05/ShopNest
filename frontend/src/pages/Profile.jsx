import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: '#fff' }}>
        <h2>You are not logged in</h2>
        <button
          onClick={() => navigate('/login')}
          className="btn"
          style={{ marginTop: '20px' }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', background: '#18181b', borderRadius: '12px' }}>
      <h1 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px' }}>User Profile</h1>
      <div style={{ marginBottom: '15px', color: '#a1a1aa' }}>
        <strong style={{ color: '#fff' }}>Name:</strong> {user.name}
      </div>
      <div style={{ marginBottom: '15px', color: '#a1a1aa' }}>
        <strong style={{ color: '#fff' }}>Email:</strong> {user.email}
      </div>
      <div style={{ marginBottom: '25px', color: '#a1a1aa' }}>
        <strong style={{ color: '#fff' }}>Role:</strong> {user.role || 'Customer'}
      </div>
      <button
        onClick={() => {
          logout();
          navigate('/login');
        }}
        className="btn-logout"
        style={{ padding: '10px 20px' }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
