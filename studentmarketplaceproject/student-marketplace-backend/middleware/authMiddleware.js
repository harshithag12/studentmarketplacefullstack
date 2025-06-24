const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Get token from headers
  const authHeader = req.headers.authorization;

  // 2. Check if token is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded; // decoded = { id, role, iat, exp }
    next(); // Move to next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

module.exports = verifyToken;
