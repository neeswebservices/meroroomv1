const User = require('../../models/auth/userModel');

const getUser = async (req, res, next) => {
	const id = req.id;

	if (!id) return res.status(400).json({ msg: 'Invalid Authentication !!' });

	const user = await User.findById(id, '-password');
	if (!user) return res.status(500).json({ msg: 'Internal server error   !!' });

	return res.status(200).json({ ...user._doc });
};

module.exports = getUser;
