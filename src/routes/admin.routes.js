const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
