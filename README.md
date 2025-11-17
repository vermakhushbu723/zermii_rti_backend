# Zermii RTI Backend API

Backend server for Zermii RTI (Your Complete Interior Design Solution)

## 🚀 Features

- ✅ Complete Authentication System
- ✅ Multi-user type support (6 types)
- ✅ JWT Authentication
- ✅ OTP Verification (Email & Phone)
- ✅ Password Reset
- ✅ Swagger API Documentation
- ✅ MongoDB Database
- ✅ Email Notifications
- ✅ Input Validation
- ✅ Error Handling

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and other settings

# Start development server
npm run dev

# Start production server
npm start
```

## 🔧 Environment Variables

Create `.env` file:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rti_app
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
```

## 📚 API Documentation

Access Swagger documentation at:
```
http://localhost:5000/api-docs
```

## 🛣️ API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/login-otp` - Send phone OTP
- `POST /api/auth/verify-login-otp` - Verify phone OTP
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

### Customer Routes
- `GET /api/customer/dashboard` - Customer dashboard

### Agent Routes
- `GET /api/agent/dashboard` - Agent dashboard

### Designer Routes
- `GET /api/designer/dashboard` - Designer dashboard

### Vendor Routes
- `GET /api/vendor/dashboard` - Vendor dashboard

### Delivery Routes
- `GET /api/delivery/dashboard` - Delivery dashboard

### Admin Routes
- `GET /api/admin/dashboard` - Admin dashboard

## 📁 Folder Structure

```
rti_backend/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── swagger.js       # Swagger configuration
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── customer.routes.js
│   │   ├── agent.routes.js
│   │   ├── designer.routes.js
│   │   ├── vendor.routes.js
│   │   ├── delivery.routes.js
│   │   └── admin.routes.js
│   └── utils/
│       ├── jwt.js           # JWT utilities
│       └── email.js         # Email utilities
├── .env
├── .env.example
├── index.js
└── package.json
```

## 🔐 User Types

- `customer` - End users
- `agent` - Real estate agents
- `designer` - Interior designers
- `vendor` - Material vendors
- `delivery` - Delivery personnel
- `admin` - Admin/HR

## 🧪 Testing

Use Postman or any API client to test endpoints.

Example Register Request:
```json
POST http://localhost:5000/api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "userType": "customer"
}
```

## 📝 License

Private & Proprietary
