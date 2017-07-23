// Check for environment variables and load them
const dotenv = require('dotenv');
dotenv.load();

// db
const pgp = require('pg-promise')();
const connection = {
	host: 'localhost',
	port: 5432,
	database: 'kickass',
	user: 'postgres',
	password: 'postgres'
};
const db = pgp(connection);

module.exports = db;