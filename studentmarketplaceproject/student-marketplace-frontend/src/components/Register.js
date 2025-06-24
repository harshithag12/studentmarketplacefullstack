// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        name, email, password, role
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required /><br/>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required /><br/>
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required /><br/>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select><br/>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
