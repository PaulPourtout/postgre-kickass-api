const db = require('../database');

const controllers = {};

controllers.users = require('./users.js')(db);
controllers.projects = require('./projects.js')(db);

module.exports = controllers;