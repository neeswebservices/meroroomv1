const jwt = require('jsonwebtoken');

const createToken = (payload, secret, time = '1h') => {
	return jwt.sign({ ...payload }, secret, { expiresIn: time });
};

const verifyToken = (token, secret) => {
	try {
		const payload = jwt.verify(token, secret);
		return payload;
	} catch (err) {
		return err.message;
	}
};

module.exports = {
	createToken,
	verifyToken,
};
