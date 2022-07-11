const { verifyToken } = require('../../utils/token');
const jwt = require('jsonwebtoken');
const User = require('../../models/auth/userModel');

const activateUser = async (req, res, next) => {
	const { activateToken } = req.body;

	if (!activateToken)
		return res.status(400).json({ msg: 'Please provide activate token !' });

	jwt.verify(activateToken, process.env.ACTIVATE, async (err, user) => {
		if (err) return res.status(400).json({ msg: err.message });
		const { name, username, loweremail, hashPassword } = user;

		const userExists = await User.findOne({ email: loweremail });
		if (userExists) {
			return res
				.status(400)
				.json({ msg: 'User already exists or activated !!' });
		}

		const newUser = new User({
			name,
			username,
			email: loweremail,
			password: hashPassword,
		});
		await newUser.save();
		return res
			.status(200)
			.json({ msg: 'User Activated Sucessfully Please Login !!' });
	});
};

module.exports = activateUser;
