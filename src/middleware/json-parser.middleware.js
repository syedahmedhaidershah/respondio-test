import bodyParser from 'body-parser';

let jsonParser;

try {
  // Initialize JSON parser middleware
  jsonParser = bodyParser.json();
} catch (error) {
  // Log the error if initialization fails
  console.error('Failed to initialize JSON parser middleware:', error);
}

export default jsonParser;
