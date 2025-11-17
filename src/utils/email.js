const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send OTP Email
 */
const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: `"RTI App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for RTI App Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #E0F6FF; padding: 20px; border-radius: 10px;">
        <div style="background-color: #87CEEB; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">RTI APP</h1>
          <p style="color: white; margin: 5px 0;">Real-Time Interior Solutions</p>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #00BFFF;">Hi ${name},</h2>
          <p style="font-size: 16px; color: #333;">Your OTP for verification is:</p>
          
          <div style="background-color: #E0F6FF; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #00BFFF; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          
          <p style="color: #666;">This OTP is valid for <strong>10 minutes</strong>.</p>
          <p style="color: #666;">If you didn't request this, please ignore this email.</p>
          
          <hr style="border: none; border-top: 1px solid #E0F6FF; margin: 20px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 RTI App. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send Welcome Email
 */
const sendWelcomeEmail = async (email, name, userType) => {
  const mailOptions = {
    from: `"RTI App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to RTI App!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #E0F6FF; padding: 20px; border-radius: 10px;">
        <div style="background-color: #87CEEB; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to RTI APP! 🎉</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #00BFFF;">Hi ${name},</h2>
          <p style="font-size: 16px; color: #333;">
            Thank you for registering as a <strong>${userType}</strong> on RTI App!
          </p>
          <p style="color: #666;">
            You can now access all features and start your journey with us.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}" 
               style="background-color: #00BFFF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Get Started
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #E0F6FF; margin: 20px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2025 RTI App. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail
};
