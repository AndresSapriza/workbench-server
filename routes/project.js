const express = require('express');
const Project = require('../models/Project');

const projectRouter = express.Router();
// new project
projectRouter.post('/', (req, res) => {
	const {
		name, description, type, admin,
	} = req.body;

	if (!name || !description || !type) {
		return res.status(400).send('Please enter all fields');
	}

	Project.findOne({ name })
		.then((project) => {
			if (project) return res.status(400).send('Project already exists');

			const newProject = new Project({
				name,
				description,
				type,
				admin,
			});
			newProject.save()
				.then((project) => {
					res.json({
						project: {
							id: project.id,
							name: project.name,
							description: project.email,
						},
					});
				}).catch((error) => {
					if (error.name === 'ValidationError') {
						const errors = {};

						Object.keys(error.errors).forEach((key) => {
							errors[key] = error.errors[key].message;
						});

						return res.status(400).send(errors);
					}
					res.status(500).send('Something went wrong');
				});
		});
});

module.exports = projectRouter;
