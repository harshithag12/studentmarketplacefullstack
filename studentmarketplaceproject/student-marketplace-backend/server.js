const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5010;

// ✅ MIDDLEWARE — Must be loaded before routes
app.use(cors());
app.use(express.json()); // 👈 this allows JSON body parsing

// ✅ ROUTES — After middleware
const authRoutes = require('./routes/authRoutes');
console.log("✅ authRoutes imported");
app.use('/api/auth', authRoutes);
console.log("✅ authRoutes middleware registered");

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
console.log("✅ productRoutes middleware registered");

// ✅ TEST ROUTE
app.get('/', (req, res) => {
  console.log("✅ GET / route was hit");
  res.send('🎉 Welcome to Student Marketplace Backend!');
});

// ✅ DEBUG ROUTES
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log("🛣️ Route registered:", r.route.path);
  }
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ✅ CONNECT TO DB & START SERVER
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ DB Connection Error:", err.message);
});
