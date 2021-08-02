const express = require('express');
const app = express();
const port = process.argv[2] ? Number(process.argv[2]) : 3000;

app.all('/*', (_req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.use(express.static('public'));

app.listen(port, () => {
	console.log(`Web server listening at ${port}`);
});