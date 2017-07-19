module.exports = (db) => {
	const projects = {

		getAll: (req, res) => {
			db.any('SELECT * FROM projects')
				.then(data => {
					res.status(200)
						.json(data);
				})
				.catch(err => next(err));
		},

		// db.any(`SELECT users._id AS user_id,
		// 								projects._id AS _id,
		// 								users.name,
		// 								projects.title
		// 								FROM users INNER JOIN projects ON (users._id = projects._creator) 
		// 								WHERE _creator = $1`,

		getOne: (req, res) => {
			db.one({
				name: 'find-project',
				// text: 'SELECT * FROM projects WHERE _id = $1',
				text: `SELECT projects._id AS _id,
											users._id AS user_id,
											projects.title,
											projects.description,
											users.name
											FROM projects INNER JOIN users ON (projects._creator = users._id) 
											WHERE projects._id = $1`,
				values: [req.params.id]
			})
				.then(data => {
					res.status(200)
						.json(data)
				})
				.catch(err => next(err));
		},

		addOne: (req, res) => {
			db.none('INSERT INTO projects(title, description, _creator) VALUES($1, $2, $3)',
				[req.body.title, req.body.description, req.body._creator])
				.then(data => {
					console.log('New project registered', data);
					res.status(200)
						.json(data);
				})
				.catch(err => console.log('error', err));
		},

		updateOne: (req, res) => {
			console.log(req.body);

			db.none('UPDATE projects SET title=($1), description=($2), _creator=($3) WHERE _id=($4)', [req.body.title, req.body.description, req.body._creator, req.params.id])
				.then(data => console.log('Project updated'))
				.catch(err => console.log('error', err));
		},

		deleteOne: (req, res) => {
			db.one({
				name: 'delete-project',
				text: 'DELETE FROM projects WHERE _id = $1',
				values: [req.params.id]
			})
				.then(data => {
					console.log('project deleted', data);
					res.status(200)
						.json(data);
				})
				.catch(err => console.log('error', err));
		},
	}

	return projects;
}