const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'ePusara API',
    version,
    description: 'Backend API for ePusara mobile application - Cemetery management system',
    contact: {
      name: 'API Support',
      email: 'support@epusara.com'
    },
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC'
    }
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development server'
    },
    {
      url: `https://api.epusara.com/v1`,
      description: 'Production server'
    }
  ],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Users', description: 'User management' },
    { name: 'Applications', description: 'Cemetery application management' },
    { name: 'Email', description: 'Email queue and templates' },
    { name: 'References', description: 'Reference data endpoints' },
    { name: 'Monitoring', description: 'API monitoring and health checks' }
  ]
};

module.exports = swaggerDef;
