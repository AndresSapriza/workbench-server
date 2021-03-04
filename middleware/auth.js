const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const token = req.header('x-auth-token');

	console.log(token);
	if (!token || token === 'undefined' || token === 'null') {
		return res.status(401).send('Authorization denied');
	}

	try {
		const decoded = jwt.verify(token, process.env.JWTSECRET);

		req.user = decoded;
		next();
	} catch (err) {
		console.log(err);
		res.status(400).send('Token is not valid');
	}
}

module.exports = auth;
