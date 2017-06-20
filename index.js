const express = require('express');
const pg = require('pg');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
// Check for environment variables and load them
const dotenv = require('dotenv');
dotenv.load();

// create application/json parser 
const jsonParser = bodyParser.json();


app.get('/', (req, res) => {
	res.send('hello');
});

const apiRouter = express();

apiRouter.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Max-Age", "3600");
	next();
});

apiRouter.get('/', (req, res) => {
	res.send('you are on a postgres API');
});

// Get all users
apiRouter.get('/users', (req, res) => {
	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
		client.query('SELECT * FROM users;', function (err, result) {
			done();

			if (err) {
				console.error(err);
				res.send("Error " + err);
			}
			else
			{ res.send(result) }
		});
	});
});
apiRouter.post('/user', (req, res) => {
	const user = req.body;

	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
		client.query('INSERT INTO users VALUES ($1, $2, $3);', [user.name, user.age, user.type], function (err, result) {
			done();

			if (err) {
				console.error(err);
				res.send("Error " + err);
			}
			else
			{ res.send(200) }
		});
	});
});

// Get all projects
apiRouter.get('/projects', (req, res) => {
	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
		client.query('SELECT * FROM projects;', function (err, result) {
			done();

			if (err) {
				console.error(err);
				res.send("Error " + err);
			}
			else {
				res.send(result);
			}
		});
	});
});


app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));