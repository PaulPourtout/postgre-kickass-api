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

		getOne: (req, res) => {
			const { id } = req.params;

			db.one({
				name: 'find-project',
				text: `SELECT projects._id AS _id,
											users._id AS user_id,
											projects.title,
											projects.description,
											users.name
											FROM projects INNER JOIN users ON (projects._creator = users._id) 
											WHERE projects._id = $1`,
				values: [id]
			})
				.then(data => {
					res.status(200)
						.json(data)
				})
				.catch(err => next(err));
		},

		addOne: (req, res) => {
			const { title, description, _creator } = req.body;

			db.none('INSERT INTO projects(title, description, _creator) VALUES($1, $2, $3)',
				[title, description, Number(_creator)])
				.then(data => {
					console.log('New project registered', data);
					res.status(200)
						.json(data);
				})
				.catch(err => console.log('error', err));
		},

		updateOne: (req, res) => {
			const { title, description, _creator } = req.body;
			const { id } = req.params;

			db.none('UPDATE projects SET title = $1, description = $2, _creator = $3 WHERE _id = $4', [title, description, Number(_creator), id])
				.then(data => {
					console.log('Project updated');
					res.status(200).json(data);
				})
				.catch(err => console.log('error', err));
		},

		deleteOne: (req, res) => {
			const { id } = req.params;

			db.one({
				name: 'delete-project',
				text: 'DELETE FROM projects WHERE _id = $1',
				values: [id]
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