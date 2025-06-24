// docs/swagger.js
//
// This file loads the OpenAPI specification and configures Swagger UI.

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load the OpenAPI spec (adjust the path if needed)
const swaggerDocument = YAML.load('./docs/openapi.yaml');

module.exports = { swaggerUi, swaggerDocument };