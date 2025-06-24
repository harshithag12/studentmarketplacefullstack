import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    axios.get('http://localhost:5010/api/products')
      .then((response) => {
        console.log('✅ Products fetched:', response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('❌ Error fetching products:', error);
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🛒 Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {products.map((product) => (
            <li
              key={product._id}
              style={{
                border: '1px solid #ddd',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Location:</strong> {product.location}</p>
              {product.image && (
                <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
