const express = require('express');
const apiRouter = express();

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


// Projects routes
apiRouter.get('/projects', (req, res) => projects.getAll(req, res));
apiRouter.get('/project/:id', (req, res) => projects.getOne(req, res));
apiRouter.post('/project', (req, res) => projects.addOne(req, res));

// apiRouter.put('/user/:id', (req, res) => users.updateOne(req, res));
apiRouter.put('/project/:id', (req, res) => projects.updateOne(req, res));

apiRouter.delete('/project/:id', (req, res) => projects.deleteOne(req, res));


module.exports = apiRouter;