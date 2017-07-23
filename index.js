const express = require('express');
const app = express();


// Middlewares
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');


const PORT = process.env.PORT || 8080;

// API
const apiRouter = require('./server/api.js');


app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, '..', '..', 'client')));




// Set headers for responses
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, PATCH");
	res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Max-Age", "3600");
	next();
});

app.use('/api', apiRouter);

app.get('*', (req, res) => {
	res.status(404).send('Page Not Found');
});

app.listen(PORT, (req, res) => console.log('Server active on port ' + PORT));