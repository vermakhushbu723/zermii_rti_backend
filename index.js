require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const connectDB = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/customer', require('./src/routes/customer.routes'));
app.use('/api/agent', require('./src/routes/agent.routes'));
app.use('/api/designer', require('./src/routes/designer.routes'));
app.use('/api/vendor', require('./src/routes/vendor.routes'));
app.use('/api/delivery', require('./src/routes/delivery.routes'));
app.use('/api/admin', require('./src/routes/admin.routes'));

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: 'RTI App Backend API',
    version: '1.0.0',
    documentation: `http://localhost:${PORT}/api-docs`,
    status: 'Running'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Zermii RTI Backend Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`📱 Mobile Access: http://10.0.2.2:${PORT}/api (Android Emulator)`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
