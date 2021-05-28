/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require('./User');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	type: {
		type: String,
		enum: {
			values: ['Scrum', 'Kanban'],
			message: '{VALUE} is not a project type valid.',
		},
		required: true,
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
}, { collection: 'Project' });

module.exports = Project = mongoose.model('Project', ProjectSchema);
