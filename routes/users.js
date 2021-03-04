const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userRouter = express.Router();
// signup
userRouter.post('/', (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).send('Please enter all fields');
	}

	User.findOne({ name })
		.then((user) => {
			if (user) return res.status(400).send('User already exists');

			const newUser = new User({
				name,
				email,
				password,
			});

			bycrypt.genSalt(10, (err, salt) => {
				bycrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save()
						.then((user) => {
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
		});
});

module.exports = userRouter;
