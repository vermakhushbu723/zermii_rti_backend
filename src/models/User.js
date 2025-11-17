const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - userType
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         phone:
 *           type: string
 *           description: User's phone number
 *         password:
 *           type: string
 *           format: password
 *           description: Hashed password
 *         userType:
 *           type: string
 *           enum: [customer, agent, designer, vendor, delivery, admin]
 *           description: Type of user
 *         profileImage:
 *           type: string
 *           description: URL to profile image
 *         isVerified:
 *           type: boolean
 *           default: false
 *           description: Email verification status
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Account active status
 *         otp:
 *           type: string
 *           description: One-time password for verification
 *         otpExpiry:
 *           type: string
 *           format: date-time
 *           description: OTP expiration time
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             pincode:
 *               type: string
 *             country:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: ['customer', 'agent', 'designer', 'vendor', 'delivery', 'admin'],
      default: 'customer'
    },
    profileImage: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    otp: {
      type: String,
      select: false
    },
    otpExpiry: {
      type: Date,
      select: false
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' }
    },
    // Agent specific fields
    agentDetails: {
      companyName: String,
      experience: Number,
      rating: { type: Number, default: 0 },
      commission: { type: Number, default: 0 }
    },
    // Designer specific fields
    designerDetails: {
      specialization: [String],
      portfolio: [String],
      rating: { type: Number, default: 0 },
      hourlyRate: Number
    },
    // Vendor specific fields
    vendorDetails: {
      businessName: String,
      businessType: String,
      gstNumber: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate OTP
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = otp;
  this.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return otp;
};

// Verify OTP
userSchema.methods.verifyOTP = function (otp) {
  if (!this.otp || !this.otpExpiry) return false;
  if (Date.now() > this.otpExpiry) return false;
  return this.otp === otp;
};

module.exports = mongoose.model('User', userSchema);
