const User = require('../../models/auth/userModel');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../utils/token');

const userLogin = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) return res.status(400).json({ msg: 'Please enter email ! ' });
	if (!password)
		return res.status(400).json({ msg: 'Please enter password ! ' });

	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ msg: 'Invalid email !!' });

	if (user && bcrypt.compareSync(password, user.password)) {
		const accesstoken = createToken(
			{ id: user._id },
			process.env.ACCESS,
			'1hr'
		);
		res.cookie('accesstoken', `${user._id} ${accesstoken}`, {
			path: '/',
			maxAge: 60 * 1000,
			httpOnly: true,
			sameSite: 'lax',
		});

		const accessToken = `${user._id} ${accesstoken}`;

		return res.status(200).json({ msg: 'User logged in', accessToken });
	} else {
		return res.status(400).json({ msg: 'Invalid Credentials !!' });
	}
};

module.exports = userLogin;
