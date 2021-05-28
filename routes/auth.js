const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const authRouter = express.Router();

// Login
authRouter.post('/', (req, res) => {
	const { name, password } = req.body;

	if (!name || !password) {
		return res.status(400).send('Please enter all fields');
	}

	User.findOne({ name })
		.then((user) => {
			if (!user) return res.status(400).send('User does not exist');

			bycrypt.compare(password, user.password)
				.then((isMatch) => {
					if (!isMatch) return res.status(400).send('Invalid credentials');
					console.log(process.env.JWTEXPIRES);
					jwt.sign(
						{ id: user.id },
						process.env.JWTSECRET,
						{ expiresIn: process.env.JWTEXPIRES }, // seconds
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									name: user.name,
									email: user.email,
								},
							});
						},
					);
				});
		});
});
// userlogged
authRouter.get('/', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then((user) => res.json(user));
});

module.exports = authRouter;
