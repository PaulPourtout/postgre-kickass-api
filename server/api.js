const express = require('express');
const apiRouter = express();
const bcrypt = require('bcrypt');
const passport = require('./auth/passport.js');

const db = require('./database');

// CONTROLLERS
const controllers = require('./controllers');
const { users, projects } = controllers;


// Users Routes
apiRouter.get('/users', (req, res) => users.getAll(req, res));
apiRouter.get('/user/:id', (req, res) => users.getOne(req, res));
apiRouter.post('/user', (req, res) => users.addOne(req, res));
apiRouter.put('/user/:id', (req, res) => users.updateOne(req, res));
apiRouter.delete('/user/:id', (req, res) => users.deleteOne(req, res));
apiRouter.get('/user/:id/projects', (req, res) => users.getUserProjects(req, res));

// signup
apiRouter.get('/signup', (req, res) => {
	res.send('signup page');
});

// apiRouter.post('/signup', (req, res) => {
// 	const { name, age, email, password } = req.body;

// 	const salt = bcrypt.genSaltSync(10);
// 	const passwordHashed = bcrypt.hashSync(password, salt)

// 	db.one('INSERT INTO users(name, age, email, password) VALUES($1, $2, $3, $4 ) RETURNING *', [name, age, email, passwordHashed])
// 		.then(user => {
// 			passport.authenticate('login', {
// 				successFlash: 'Well done',
// 				failureFlash: 'Try again'
// 			})
// 		})
// 		.catch(err => console.log('error', err));
// });
apiRouter.post('/signup', passport.authenticate('signup'), (req, res) => {
	res.send('added and connected !');
})

// signin
apiRouter.post('/signin', passport.authenticate('login'), (req, res) => {
	res.send('ouiiiii');
});


// Projects routes
apiRouter.get('/projects', (req, res) => projects.getAll(req, res));
apiRouter.get('/project/:id', (req, res) => projects.getOne(req, res));
apiRouter.post('/project', (req, res) => projects.addOne(req, res));

// apiRouter.put('/user/:id', (req, res) => users.updateOne(req, res));
apiRouter.put('/project/:id', (req, res) => projects.updateOne(req, res));

apiRouter.delete('/project/:id', (req, res) => projects.deleteOne(req, res));


module.exports = apiRouter;