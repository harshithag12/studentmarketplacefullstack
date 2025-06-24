const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const verifyToken = require('../middleware/authMiddleware');

// 🆕 Add Product (Protected)
router.post('/add', verifyToken, async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      sellerId: req.user.id, // set seller from token
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error("❌ ERROR in /add:", error.message);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// 🆕 Get All Products (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, location } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;

    const products = await Product.find(filter).populate('sellerId', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 🆕 Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('sellerId', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// 🆕 Get Own Products
router.get('/my-products', verifyToken, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your products' });
  }
});

// 🆕 Update Product (only by owner)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 🆕 Delete Product (only by owner)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
