const { body, validationResult } = require('express-validator');

/**
 * Validation middleware
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Register validation rules
 */
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  body('userType')
    .notEmpty().withMessage('User type is required')
    .isIn(['customer', 'agent', 'designer', 'vendor', 'delivery', 'admin'])
    .withMessage('Invalid user type')
];

/**
 * Login validation rules
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

/**
 * OTP validation rules
 */
const otpValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('otp')
    .trim()
    .notEmpty().withMessage('OTP is required')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
];

/**
 * Phone OTP validation rules
 */
const phoneOTPValidation = [
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  
  body('userType')
    .notEmpty().withMessage('User type is required')
];

/**
 * Reset password validation rules
 */
const resetPasswordValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('otp')
    .trim()
    .notEmpty().withMessage('OTP is required')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  
  body('newPassword')
    .trim()
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  otpValidation,
  phoneOTPValidation,
  resetPasswordValidation
};
