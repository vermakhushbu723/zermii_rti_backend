const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 */
const generateToken = (userId, userType) => {
  return jwt.sign(
    { id: userId, userType },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * Verify JWT Token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
