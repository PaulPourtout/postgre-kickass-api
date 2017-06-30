const express = require('express');

// db
const pgp = require('pg-promise')();
const connection = {
	host: 'localhost',
	port: 5432,
	database: 'kickass',
	user: 'postgres',
	password: 'postgres'
};
// const connection = 'postgres://localhost:5432/kickass';

// const connection = process.env.DATABASE_URL;
const db = pgp(connection);


// Check for environment variables and load them
const dotenv = require('dotenv');
dotenv.load();


// CONTROLLERS
const users = require('./controllers/users.js');
const projects = require('./controllers/projects.js');

const apiRouter = express();


// Set headers for responses
apiRouter.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
	res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Max-Age", "3600");
	next();
});

apiRouter.get('/', (req, res) => res.send('bienvenue sur une api PostgreSQL'));

// Users Routes
apiRouter.get('/users', (req, res) => {
	db.any('SELECT * FROM users ORDER BY name')
		.then(data => {
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error : ', err));
});

apiRouter.get('/user/:id', (req, res) => {
	db.one({
		name: 'find-user',
		text: 'SELECT * FROM users WHERE _id = $1',
		values: [req.params.id]
	})
		.then(data => {
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});

apiRouter.post('/user', (req, res) => {
	db.none('INSERT INTO users(name, age, type) VALUES($1, $2, $3)',
		[req.body.name, req.body.age, req.body.type])
		.then(data => {
			console.log('New User registered', data);
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});

apiRouter.delete('/user/:id', (req, res) => {
	db.any({
		name: 'remove-user',
		text: 'DELETE FROM users WHERE _id = $1',
		values: [Number(req.params.id)]
	})
		.then(data => {
			console.log('User deleted', data);
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});

apiRouter.put('/user/:id', (req, res) => {

	db.any({
		name: 'update-user',
		text: 'UPDATE users SET name = $1, age = $2, type = $3 WHERE _id = $4',
		values: [req.body.name, Number(req.body.age), req.body.type, Number(req.params.id)]
	})
		.then(data => {
			console.log('User updated', data);
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});

apiRouter.get('/user/:id/projects', (req, res) => {
	db.any('SELECT * FROM projects WHERE _creator = $1', [req.params.id])
		.then(data => {
			res.status(200)
				.json(data)
		})
		.catch(err => console.log('error', err));
});


// Projects routes
apiRouter.get('/projects', (req, res) => {
	db.any('SELECT * FROM projects ORDER BY title')
		.then(data => {
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});

apiRouter.get('/project/:id', (req, res) => {
	db.one({
		name: 'find-project',
		text: 'SELECT projects._id AS project_id, users._id AS user_id, title, description, _creator, name FROM projects INNER JOIN users ON users._id = projects._creator WHERE projects._id = $1',
		values: [Number(req.params.id)]
	})
		.then(data => {
			res.status(200)
				.json(data)
		})
		.catch(err => console.log('error', err));
});

apiRouter.post('/project', (req, res) => {
	db.none('INSERT INTO projects(title, description, _creator) VALUES($1, $2, $3)',
		[req.body.title, req.body.description, req.body._creator])
		.then(data => {
			console.log('New project registered', data);
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});

apiRouter.delete('/project/:id', (req, res) => {
	db.one({
		name: 'delete-project',
		text: 'DELETE FROM projects WHERE _id = $1',
		values: [req.params.id]
	})
		.then(data => {
			console.log('project deleted', data);
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});


apiRouter.get('/proj', (req, res) => {
	db.any('SELECT users._id AS user_id, projects._id AS project_id, users.name, projects.title FROM users INNER JOIN projects ON (users._id = projects._creator) WHERE _creator = 1')
		.then(data => {
			console.log(data);
			res.status(200)
				.json(data);
		})
		.catch(err => console.log('error', err));
});




module.exports = { db, apiRouter };