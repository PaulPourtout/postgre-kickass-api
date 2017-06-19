const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.send('hello');
});

const apiRouter = express();

apiRouter.get('/users', (req, res) => {
	res.send('users');
});



app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));