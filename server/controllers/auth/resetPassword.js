const jwt = require('jsonwebtoken');
const User = require('../../models/auth/userModel');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res, next) => {
	const { resetToken } = req.body;

	if (!resetToken) return res.status(400).json({ msg: 'Invalid Auth !' });
	jwt.verify(resetToken, process.env.RESET, async (err, data) => {
		if (err) return res.status(400).json({ msg: err.message });

		const { id, email, newpassword } = data;

		const hashPassword = bcrypt.hashSync(newpassword, 12);

		await User.findByIdAndUpdate(id, {
			password: hashPassword,
		});

		return res
			.status(200)
			.json({ msg: 'Password sucessfully reset please login !!' });
	});
};

module.exports = resetPassword;
