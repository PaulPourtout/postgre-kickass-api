const express = require('express');
const app = express();

const { db } = require('../api.js');
const bodyParser = require('body-parser');

// const pgp = require('pg-promise')();
// const db = pgp(process.env.DATABASE_URL);

// // Check for environment variables and load them
// const dotenv = require('dotenv');
// dotenv.load();

// create application/json parser 
const jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/json' }));



const users = {
	coucou: (req, res) => {
		res.send('db : ' + db);
	},
	getAll: (req, res) => {
		db.any('SELECT * FROM users')
			.then(data => {
				res.status(200)
					.json(data);
			})
			.catch(err => next(err));
	},
	getOne: (req, res) => {
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
	},
	createNew: (req, res) => {
		db.none('INSERT INTO users VALUES($1, $2, $3)', [req.body.name, req.body.age, req.body.type])
			.then(data => console.log('New User registered'))
			.catch(err => console.log('error', err));
	},
}

module.exports = users;