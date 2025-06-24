// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import './App.css';
import AddProduct from './components/AddProduct';
import Dashboard from './components/Dashboard';

// Inside <Routes>


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/add" element={<AddProduct />} />
<Route path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={<ProductList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
