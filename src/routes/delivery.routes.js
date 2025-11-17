const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /delivery/dashboard:
 *   get:
 *     summary: Get delivery dashboard data
 *     tags: [Delivery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('delivery'), (req, res) => {
  res.json({
    success: true,
    message: 'Delivery dashboard',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
