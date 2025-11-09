const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing malformed auth comment patterns...\n');

const routesDir = path.join(__dirname, 'src', 'routes', 'v1');

// Get all .js files in the routes directory
const routeFiles = fs.readdirSync(routesDir)
  .filter(file => file.endsWith('.js') && file !== 'index.js');

let totalFixed = 0;

routeFiles.forEach(file => {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix malformed patterns like: /*/*auth()*/ // UNCOMMENT: auth(),*/ // UNCOMMENT: /*auth()*/ // UNCOMMENT: auth(),,,
  const malformedPattern = /\/\*\/\*auth\(\)\*\/ \/\/ UNCOMMENT: auth\(\),\*\/ \/\/ UNCOMMENT: \/\*auth\(\)\*\/ \/\/ UNCOMMENT: auth\(\),,+/g;
  if (malformedPattern.test(content)) {
    content = content.replace(malformedPattern, '/*auth(),*/');
    modified = true;
  }

  // Fix patterns like: /*/*auth()*/ // UNCOMMENT: auth(),,*/
  const malformedPattern2 = /\/\*\/\*auth\(\)\*\/ \/\/ UNCOMMENT: auth\(\),,+\*\//g;
  if (malformedPattern2.test(content)) {
    content = content.replace(malformedPattern2, '/*auth(),*/');
    modified = true;
  }

  // Fix any remaining malformed auth patterns
  const malformedPattern3 = /\/\*\/\*auth\(\)\*\/[^,]*,+/g;
  if (malformedPattern3.test(content)) {
    content = content.replace(malformedPattern3, '/*auth(),*/');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed malformed patterns in: ${file}`);
    totalFixed++;
  }
});

console.log(`\n✅ Fixed malformed auth patterns in ${totalFixed} files!`);
console.log('💡 All syntax errors should now be resolved');