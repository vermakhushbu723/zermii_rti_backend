const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /agent/dashboard:
 *   get:
 *     summary: Get agent dashboard data
 *     tags: [Agent]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('agent'), (req, res) => {
  res.json({
    success: true,
    message: 'Agent dashboard',
    data: {
      user: req.user
    }
  });
});

module.exports = router;
