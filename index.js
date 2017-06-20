const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

// const pg = require('pg');
const pgp = require('pg-promise');
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


apiRouter.get('/', (req, res) => {
	db.any('SELECT * FROM users')
		.then(data => data.json())
		.then(result => result)
		.catch(err => console.log('error :', err));


});









// // Get all users
// apiRouter.get('/users', (req, res) => {
// 	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
// 		client.query('SELECT * FROM users;', function (err, result) {
// 			done();

// 			if (err) {
// 				console.error(err);
// 				res.send("Error " + err);
// 			}
// 			else
// 			{ res.send(result) }
// 		});
// 	});
// });
// apiRouter.post('/user', (req, res) => {
// 	const user = req.body;

// 	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
// 		// pg.connect(database, function (err, client, done) {
// 		client.query('INSERT INTO users VALUES ($1, $2, $3);', [user.name, user.age, user.type], function (err, result) {
// 			console.log(req.body);
// 			done();

// 			if (err) {
// 				console.error(err);
// 				res.send("Error " + err);
// 			}
// 			else
// 			{ res.send(200) }
// 		});
// 	});
// });

// // Get all projects
// apiRouter.get('/projects', (req, res) => {
// 	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
// 		client.query('SELECT * FROM projects;', function (err, result) {
// 			done();

// 			if (err) {
// 				console.error(err);
// 				res.send("Error " + err);
// 			}
// 			else {
// 				res.send(result);
// 			}
// 		});
// 	});
// });


app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));