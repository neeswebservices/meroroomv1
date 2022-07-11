const jwt = require('jsonwebtoken');

const resetAuth = async (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) return res.status(400).json({ msg: 'Invalid Authentication !' });

	if (!token)
		return res
			.status(400)
			.json({ msg: 'Invalid you cannot reset password !! try again !' });

	jwt.verify(token, process.env.RESETACCESS, (err, user) => {
		if (err) return res.status(400).json({ msg: `${err.message}` });
		req.id = user.id;
		console.log(id);
		next();
	});
};

module.exports = resetAuth;
