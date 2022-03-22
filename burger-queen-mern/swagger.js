const swaggerAutogen = require('swagger-autogen')();
const { endPoints } = require('./endpoints');

const doc = {
	info: {
		version: '1.0.0',
		title: 'Burger Queen MERN'
	},
	host: 'localhost:8000',
	basePath: '/',
	schemes: ['http'],
	consumes: ['application/json'],
	produces: ['application/json'],
	securityDefinitions: {
		bearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT'
		}
	}
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./endpoints.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then();
