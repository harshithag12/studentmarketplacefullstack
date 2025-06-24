import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    image: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5010/api/products/add', product, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('✅ Product added successfully!');
      setProduct({
        title: '', description: '', price: '', category: '', location: '', image: ''
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={product.location} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
