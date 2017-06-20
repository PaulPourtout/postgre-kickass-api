const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

// Check for environment variables and load them
const dotenv = require('dotenv');
dotenv.load();

// create application/json parser 
const jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/json' }));



const users = {
	getAllUsers: (req, res) => {
		db.any('SELECT * FROM users')
			.then(data => {
				res.status(200)
					.json(data);
			})
			.catch(err => next(err));
	}
}

module.exports = users;