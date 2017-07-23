const db = require('../database');
const bcrypt = require('bcrypt');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use('login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
},
	function (req, email, password, done) {
		console.log('strategy started');
		db.any('SELECT * FROM users WHERE email = $1', [email])
			.then(data => {
				const user = data[0];

				if (!user) return done(null, false, { message: 'bad email' });
				if (!bcrypt.compareSync(password, user.password)) {
					return done(null, false, { message: 'bad password' });
				}
				return done(null, user);
			})
			.catch(err => done(err, null));
	}
));


passport.use('signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
},
	function (req, email, password, done) {

		db.any('SELECT * FROM users WHERE email = $1', [email])
			.then(data => {
				const user = data[0];

				if (user) return done(null, false, { message: 'Email already taken' })

				else {
					const salt = bcrypt.genSaltSync(10);
					const passwordHashed = bcrypt.hashSync(req.body.password, salt)

					db.one('INSERT INTO users(name, age, email, password) VALUES($1, $2, $3, $4 ) RETURNING *', [req.body.name, req.body.age, req.body.email, passwordHashed])
						.then(user => done(null, user))
						.catch(err => done(err, null));
				}
			})
			.catch(err => done(err, null));
	}));


passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
	db.any('SELECT * FROM users WHERE _id = $1', [id])
		.then((user) => done(null, user))
		.catch((err) => done(err, null));
});

module.exports = passport;
