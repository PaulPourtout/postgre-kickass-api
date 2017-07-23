const db = require('../database');
const bcrypt = require('bcrypt');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport.js');


init();

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
},
	function (req, email, password, done) {
		db.one({
			text: 'SELECT * FROM users WHERE email = $1',
			values: [email]
		})
			.then(user => {
				if (!user) return done(null, false, { message: 'Incorrect email.' });
				if (!bcrypt.compareSync(password, user.password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			})
			.catch(err => done(err));
	}
));

module.exports = passport;
