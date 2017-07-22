module.exports = (db) => {
	const users = {

		getAll: (req, res) => {
			db.any('SELECT * FROM users')
				.then(data => {
					res.status(200)
						.json(data);
				})
				.catch(err => next(err));
		},

		getOne: (req, res) => {
			db.one({
				name: 'find-user',
				text: 'SELECT * FROM users WHERE _id = $1',
				values: [req.params.id]
			})
				.then(data => {
					res.status(200)
						.json(data)
				})
				.catch(err => next(err));
		},

		addOne: (req, res) => {
			const { name, age, type } = req.body;

			db.one('INSERT INTO users(name, age, type) VALUES($1, $2, $3) RETURNING *', [name, age, type])
				.then(data => {
					console.log('New User registered ', data);
					res.json(data);
				})
				.catch(err => console.log('error', err));
		},

		updateOne: (req, res) => {
			const { name, age, type } = req.body;
			const { id } = req.params;

			db.none('UPDATE users SET name=($1), age=($2), type=($3) where _id=($4)', [name, age, type, id])
				.then(data => {
					console.log('User updated');
					res.json(data);
				})
				.catch(err => console.log('error', err));
		},

		deleteOne: (req, res) => {
			db.one({
				name: 'delete-user',
				text: 'DELETE FROM users WHERE _id = $1 RETURNING *',
				values: [req.params.id]
			})
				.then(data => {
					console.log('user deleted', data);
					res.status(200)
						.json(data);
				})
				.catch(err => console.log('error', err));
		},

		getUserProjects: (req, res) => {
			db.any(`SELECT users._id AS user_id,
										projects._id AS _id,
										users.name,
										projects.title
										FROM users INNER JOIN projects ON (users._id = projects._creator) 
										WHERE _creator = $1`,
				[req.params.id])
				.then(data => {
					res.status(200)
						.json(data);
				})
				.catch(err => console.log('error', err));
		},
	}

	return users;
}