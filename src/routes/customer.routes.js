const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /customer/dashboard:
 *   get:
 *     summary: Get customer dashboard data
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('customer'), (req, res) => {
  res.json({
    success: true,
    message: 'Customer dashboard',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
