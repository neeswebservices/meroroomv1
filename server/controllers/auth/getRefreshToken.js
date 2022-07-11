const jwt = require('jsonwebtoken');
const { createToken } = require('../../utils/token');

const getRefreshToken = async (req, res, next) => {
	const { accessToken } = req.body;

	if (!accessToken) return res.status(400).json({ msg: 'Invalid cookie !' });

	const id = accessToken.split(' ')[0];
	const token = accessToken.split(' ')[1];

	if (id !== req.id)
		return res.status(400).json({ msg: 'Invalid Signature !!' });

	jwt.verify(token, process.env.ACCESS, (err, user) => {
		if (err) return res.status(400).json({ msg: err.message });

		const refreshtoken = createToken(
			{ id: user.id },
			process.env.REFRESH,
			'5d'
		);
		res.cookie('refreshtoken', refreshtoken, {
			path: '/',
			maxAge: 5 * 24 * 60 * 60 * 1000,
			httpOnly: false,
			sameSite: 'lax',
		});
		res.status(200).json({ refreshtoken });
	});
};

module.exports = getRefreshToken;
