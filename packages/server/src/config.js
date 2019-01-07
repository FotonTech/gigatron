import dotenvSafe from 'dotenv-safe';

if (!process.env.NOW_REGION) {
  dotenvSafe.load({
    path: root('.env'),
    sample: root('.env.example'),
  });
}

// Database Settings
const dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/fotonChat';
const dBproduction = process.env.MONGO_URL || 'mongodb://localhost/fotonChat';

console.log('dBdevelopment', dBdevelopment);
console.log('dBproduction', dBproduction);
// Test Database Settings
// const test = 'mongodb://localhost/awesome-test';

// Export DB Settings
export const databaseConfig = process.env.NODE_ENV === 'production' ? dBproduction : dBdevelopment;

// Export GraphQL Server settings
export const graphqlPort = process.env.GRAPHQL_PORT || 5000;
export const jwtSecret = process.env.JWT_KEY || 'secret_key';
