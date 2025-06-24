import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5010/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const myId = decodedToken.id;

        const myData = res.data.filter((prod) => prod.sellerId?._id === myId);
        setMyProducts(myData);
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
      }
    };

    fetchMyProducts();
  }, []);

  return (
    <div>
      <h2>My Dashboard</h2>
      {myProducts.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <ul>
          {myProducts.map((p) => (
            <li key={p._id}>
              <strong>{p.title}</strong> — ₹{p.price} in {p.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
