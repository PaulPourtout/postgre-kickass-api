const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;


app.get('/', (req, res) => {
	res.send('hello');
});


// DATABASE
const pg = require('pg');

app.get('/db', function (request, response) {
	pg.connect(process.env.DATABASE_URL, function (err, client, done) {
		client.query('SELECT * FROM kickass', function (err, result) {
			done();
			if (err)
			{ console.error(err); response.send("Error " + err); }
			else
			{ response.render('pages/db', { results: result.rows }); }
		});
	});
});




const apiRouter = express();

apiRouter.get('/users', (req, res) => {
	res.send('users');
});



app.use('/api', apiRouter);

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));