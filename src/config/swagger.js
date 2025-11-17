const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zermii RTI API Documentation',
      version: '1.0.0',
      description: 'Zermii RTI - Your Complete Interior Design Solution - Complete API Documentation',
      contact: {
        name: 'Zermii RTI Support',
        email: 'support@zermii.com'
      },
      license: {
        name: 'Private',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
      {
        url: 'https://api.rtiapp.com/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Customer', description: 'Customer module endpoints' },
      { name: 'Agent', description: 'Agent module endpoints' },
      { name: 'Designer', description: 'Designer module endpoints' },
      { name: 'Vendor', description: 'Vendor module endpoints' },
      { name: 'Delivery', description: 'Delivery module endpoints' },
      { name: 'Admin', description: 'Admin/HR module endpoints' },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
