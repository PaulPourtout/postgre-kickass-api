const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

// const pg = require('pg');
const promise = require('bluebird');

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);
// Check for environment variables and load them

const dotenv = require('dotenv');
dotenv.load();

// create application/json parser 
const jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/json' }));





app.get('/', (req, res) => {
	res.send('hello');
});

const apiRouter = express();

// Set headers for responses
apiRouter.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Max-Age", "3600");
	next();
});


apiRouter.get('/users', (req, res) => {
	db.any('SELECT * FROM users')
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved all users'
				});
		})
		.catch(err => next(err));
});

apiRouter.get('/user/:id', (req, res) => {
	db.one({
		name: 'find-user',
		text: 'SELECT * FROM users WHERE _id = $1',
		values: [req.params.id]
	})
		.then(data => {
			res.status(200)
				.json(data)
		})
		.catch(err => next(err));
})


apiRouter.get('/projects', (req, res) => {
	db.any('SELECT * FROM projects')
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved all projects'
				});
		})
		.catch(err => next(err));
});

apiRouter.get('/project', (req, res) => {
	db.one({
		name: 'find-project',
		text: 'SELECT * FROM projects WHERE _id = $1',
		values: [req.params.id]
	})
		.then(data => {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved the project'
				})
		})
		.catch(err => next(err));
});


app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));