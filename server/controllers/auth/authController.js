const userLogin = require('./userLogin');
const userRegiser = require('./userRegister');
const activateUser = require('./activateUser');
const getRefreshToken = require('./getRefreshToken');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const getUser = require('./getUser');
const logoutUser = require('./logoutUser');

exports.controllers = {
	userLogin,
	userRegiser,
	activateUser,
	getRefreshToken,
	forgotPassword,
	resetPassword,
	getUser,
	logoutUser,
};
