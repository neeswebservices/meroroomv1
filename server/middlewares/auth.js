const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
	try {
		const token = req.headers['authorization'] || req.cookies.refreshtoken;
		if (!token)
			return res.status(400).json({ msg: 'Invalid Authentication !!' });

		jwt.verify(token, process.env.REFRESH, (err, user) => {
			if (err) return res.status(401).json({ msg: err.message });

			req.id = user.id;
			next();
		});
	} catch (err) {
		return res.status(400).json({ msg: err.message });
	}
};

module.exports = auth;
