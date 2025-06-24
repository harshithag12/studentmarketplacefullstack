import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ fixed import

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let userRole = null;
  if (token) {
    try {
      const decoded = jwtDecode(token); // ✅ fixed usage
      userRole = decoded.role;
    } catch (err) {
      console.error("⚠️ Invalid token:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#333', color: 'white' }}>
      <Link to="/" style={{ margin: '10px', color: 'white' }}>Home</Link>

      {!token && (
        <>
          <Link to="/register" style={{ margin: '10px', color: 'white' }}>Register</Link>
          <Link to="/login" style={{ margin: '10px', color: 'white' }}>Login</Link>
        </>
      )}

      {token && userRole === 'seller' && (
        <>
          <Link to="/add-product" style={{ margin: '10px', color: 'white' }}>Add Product</Link>
          <Link to="/dashboard" style={{ margin: '10px', color: 'white' }}>Dashboard</Link>
        </>
      )}

      {token && (
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
