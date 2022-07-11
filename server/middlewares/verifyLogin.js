const jwt = require('jsonwebtoken');

const verifyLogin = async (req, res, next) => {
	const refreshtoken =
		req.body || req.headers['authorization'] || req.cookies.refreshtoken;

	if (!refreshtoken)
		return res.status(403).json({ msg: 'Please Login Now !!' });
	jwt.verify(refreshtoken.refreshtoken, process.env.REFRESH, (err, user) => {
		if (err) return res.status(401).json({ msg: err.message });
		console.log(user);
		next();
	});
};

module.exports = verifyLogin;
