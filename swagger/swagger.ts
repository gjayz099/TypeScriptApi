import express, { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Define the options for swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'I Swagger',
      version: '1.0.0',
      description: 'API endpoints Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

// Generate the Swagger specification
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number): void {
  // Serve Swagger UI and the generated Swagger docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Endpoint for getting the Swagger JSON specification
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
