/*import path from 'path';
import dotenvSafe from 'dotenv-safe';

const root = path.join.bind(this, __dirname, '../');

dotenvSafe.load({
  path: root('.env'),
});

// Database Settings
const dBdevelopment = process.env.MONGO_URL || 'mongodb://localhost/fotonChat';
const dBproduction = process.env.MONGO_URL || 'mongodb://localhost/fotonChat';

// Test Database Settings
// const test = 'mongodb://localhost/awesome-test';

// Export DB Settings
export const databaseConfig = process.env.NODE_ENV === 'production' ? dBproduction : dBdevelopment;

// Export GraphQL Server settings
export const graphqlPort = process.env.GRAPHQL_PORT || 5000;
export const jwtSecret = process.env.JWT_KEY || 'secret_key';
*/

// Database Settings
const dBdevelopment = 'mongodb://localhost/fotonChat';

// Test Database Settings
// const test = 'mongodb://localhost/awesome-test';

// Export DB Settings
export const databaseConfig = dBdevelopment;

// Export GraphQL Server settings
export const graphqlPort = 5000;
export const jwtSecret = 'secret_key';
