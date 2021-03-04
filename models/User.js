/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
}, { collection: 'User' });

module.exports = User = mongoose.model('User', UserSchema);
