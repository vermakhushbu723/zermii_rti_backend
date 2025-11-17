const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /vendor/dashboard:
 *   get:
 *     summary: Get vendor dashboard data
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('vendor'), (req, res) => {
  res.json({
    success: true,
    message: 'Vendor dashboard',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
