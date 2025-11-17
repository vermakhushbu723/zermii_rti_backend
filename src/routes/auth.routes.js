const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyOTP,
  resendOTP,
  loginWithOTP,
  verifyLoginOTP,
  forgotPassword,
  resetPassword,
  getMe
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const {
  validate,
  registerValidation,
  loginValidation,
  otpValidation,
  phoneOTPValidation,
  resetPasswordValidation
} = require('../middleware/validation.middleware');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *               - userType
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               userType:
 *                 type: string
 *                 enum: [customer, agent, designer, vendor, delivery, admin]
 *                 example: customer
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration successful. OTP sent to your email.
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists or validation error
 */
router.post('/register', registerValidation, validate, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - userType
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               userType:
 *                 type: string
 *                 enum: [customer, agent, designer, vendor, delivery, admin]
 *                 example: customer
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidation, validate, login);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify email OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */
router.post('/verify-otp', otpValidation, validate, verifyOTP);

/**
 * @swagger
 * /auth/resend-otp:
 *   post:
 *     summary: Resend OTP to email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/resend-otp', resendOTP);

/**
 * @swagger
 * /auth/login-otp:
 *   post:
 *     summary: Send OTP for phone login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - userType
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               userType:
 *                 type: string
 *                 enum: [customer, agent, designer, vendor, delivery, admin]
 *                 example: customer
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/login-otp', phoneOTPValidation, validate, loginWithOTP);

/**
 * @swagger
 * /auth/verify-login-otp:
 *   post:
 *     summary: Verify phone OTP and login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - otp
 *               - userType
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               userType:
 *                 type: string
 *                 example: customer
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/verify-login-otp', verifyLoginOTP);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send OTP for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Password reset OTP sent
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post('/reset-password', resetPasswordValidation, validate, resetPassword);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 */
router.get('/me', protect, getMe);

module.exports = router;
