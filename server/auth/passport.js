const passport = require('passport');
const db = require('../database');

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		db.one({
			text: 'SELECT * FROM users WHERE id = $1',
			values: [id]
		})
			.then((user) => { done(null, user); })
			.catch((err) => { done(err, null); });
	});
};
