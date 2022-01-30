import swaggerJsdoc from 'swagger-jsdoc';
import { INIExpress } from './01_Config/INIExpress';

const packageJSON = require('../package.json');

export const specs = swaggerJsdoc({
	swaggerDefinition: {
		info: {
			title: packageJSON.name,
			version: packageJSON.version,
			description: packageJSON.description
		},
		host: INIExpress.URL,
		basePath: '/'
	},
	apis: ['./99_Source/**/*.ts']
});
