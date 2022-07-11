const router = require('express').Router();
const authController = require('../controllers/auth/authController');
const verifyToken = require('../middlewares/verifyToken');
const resetAuth = require('../middlewares/resetAuth');
const auth = require('../middlewares/auth');
const verifyLogin = require('../middlewares/verifyLogin');
router.post('/register', authController.controllers.userRegiser);
router.post('/login', authController.controllers.userLogin);
router.post('/activate', authController.controllers.activateUser);
router.post(
	'/refreshtoken',
	verifyToken,
	authController.controllers.getRefreshToken
);
router.post('/forgot', authController.controllers.forgotPassword);
router.post('/reset', authController.controllers.resetPassword);
router.get('/get', auth, authController.controllers.getUser);
router.post('/logout', verifyLogin, authController.controllers.logoutUser);

module.exports = router;
