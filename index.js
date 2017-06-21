const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const bodyParser = require('body-parser');

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

// Check for environment variables and load them
const dotenv = require('dotenv');
dotenv.load();

// create application/json parser 
const jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/json' }));

// CONTROLLERS
const users = require('./server/controllers/users.js');
const projects = require('./server/controllers/projects.js');

app.get('/', (req, res) => {
	res.send('hello');
});

const apiRouter = express();

// Set headers for responses
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
	res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Max-Age", "3600");
	next();
});


apiRouter.get('/users', (req, res) => users.getAll(req, res));
apiRouter.get('/user/:id', (req, res) => users.getOne(req, res));

apiRouter.post('/user', (req, res) => {
	db.none('INSERT INTO users VALUES($1, $2, $3)', [req.body.name, req.body.age, req.body.type])
		.then(data => console.log('New User registered'))
		.catch(err => console.log('error', err));
});

apiRouter.get('/projects', (req, res) => projects.getAll(req, res));
apiRouter.get('/project/:id', (req, res) => projects.getOne(req, res));


app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));