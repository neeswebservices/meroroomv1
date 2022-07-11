const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
	const { accesstoken } = req.cookies;

	if (!accesstoken)
		return res.status(400).json({ msg: 'Please provide access token !' });

	const token = accesstoken.split(' ')[1];

	jwt.verify(token, process.env.ACCESS, (err, user) => {
		if (err) return res.status(400).json({ msg: err.message });
		req.id = user.id;
		console.log(user);
		next();
	});
};

module.exports = verifyToken;
