const logoutUser = async (req, res, next) => {
	try {
		const token = req.cookies;
		if (token.refreshtoken) {
			res.clearCookie('refreshtoken');
			res.status(200).json({ msg: 'User Logged Out !' });
		} else {
			res.status(401).json({ msg: 'Unauthorized !' });
		}
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = logoutUser;
