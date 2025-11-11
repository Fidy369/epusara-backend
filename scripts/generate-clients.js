const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const SWAGGER_JSON_URL = `${SERVER_URL}/v1/docs/swagger.json`;
const OUTPUT_DIR = path.join(__dirname, '..', 'generated-clients');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const clients = [
  {
    name: 'javascript',
    generator: 'javascript',
    description: 'JavaScript/Node.js client'
  },
  {
    name: 'typescript-axios',
    generator: 'typescript-axios',
    description: 'TypeScript client with Axios'
  },
  {
    name: 'python',
    generator: 'python',
    description: 'Python client'
  }
];

console.log('🚀 Generating OpenAPI clients...\n');

// Check if OpenAPI Generator is installed
try {
  execSync('openapi-generator-cli version', { stdio: 'ignore' });
} catch (error) {
  console.log('📦 Installing OpenAPI Generator CLI...');
  execSync('npm install -g @openapitools/openapi-generator-cli', { stdio: 'inherit' });
}

// Generate clients
clients.forEach(client => {
  const clientDir = path.join(OUTPUT_DIR, client.name);
  
  console.log(`📝 Generating ${client.description}...`);
  
  try {
    const command = `openapi-generator-cli generate -i ${SWAGGER_JSON_URL} -g ${client.generator} -o ${clientDir}`;
    
    execSync(command, { stdio: 'inherit' });
    
    console.log(`✅ ${client.description} generated at: ${clientDir}\n`);
  } catch (error) {
    console.error(`❌ Failed to generate ${client.description}`);
  }
});

console.log('🎉 Client generation completed!');
console.log(`📖 Swagger UI: ${SERVER_URL}/v1/docs`);
console.log(`📄 OpenAPI spec: ${SWAGGER_JSON_URL}`);