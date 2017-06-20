const express = require('express');
const pg = require('pg');
const app = express();
const PORT = process.env.PORT || 8080;


app.get('/', (req, res) => {
	res.send('hello');
});


const apiRouter = express();

apiRouter.get('/', (req, res) => {
	res.send('you are on a postgres API');
});

// Get all users
apiRouter.get('/users', (req, res) => {
	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
		client.query('SELECT * FROM users', function (err, result) {
			done();

			if (err) {
				console.error(err);
				response.send("Error " + err);
			}
			else
			{ res.send(result) }
		});
	});
});


app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));