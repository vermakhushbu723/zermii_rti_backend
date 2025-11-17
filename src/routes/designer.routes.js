const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /designer/dashboard:
 *   get:
 *     summary: Get designer dashboard data
 *     tags: [Designer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('designer'), (req, res) => {
  res.json({
    success: true,
    message: 'Designer dashboard',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
