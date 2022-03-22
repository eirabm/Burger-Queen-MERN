const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { key } = require('./config/config');
const { endPoints } = require('./endpoints');

const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger-output.json');

const port = 8000;

const jsonParser = bodyParser.json();

app.set('key', key);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(jsonParser);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerOptions));

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});

endPoints(app);