const express = require('express');

// db
const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);


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
apiRouter.get('/users', (req, res) => users.getAll(req, res));
apiRouter.get('/user/:id', (req, res) => users.getOne(req, res));
apiRouter.get('/coucou', (req, res) => users.coucou(req, res));
apiRouter.post('/user', (req, res) => users.createNew(req, res));

apiRouter.get('/projects', (req, res) => projects.getAll(req, res));
apiRouter.get('/project/:id', (req, res) => projects.getOne(req, res));


module.exports = { db, apiRouter };