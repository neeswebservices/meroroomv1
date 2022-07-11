const {
	validateEmail,
	validateUsername,
	validateName,
	validatePassword,
} = require("../../utils/validation");
const User = require("../../models/auth/userModel");
const bcrypt = require("bcryptjs");
const {createToken} = require("../../utils/token");
const sendmail = require("../../utils/sendmail");

const userRegister = async (req, res, next) => {
	try {
		const {name, username, email, password} = req.body;

		const loweremail = email.toLowerCase();

		if (!name) return res.status(400).json({msg: "Please enter name ! "});
		if (!username)
			return res.status(400).json({msg: "Please enter username ! "});
		if (!email) return res.status(400).json({msg: "Please enter email ! "});
		if (!password)
			return res.status(400).json({msg: "Please enter password ! "});

		const user1 = await User.findOne({username});
		if (user1) {
			return res.status(400).json({
				msg: "Username already taken, try another !!",
			});
		}
		const user = await User.findOne({email: loweremail});
		if (user) {
			return res.status(400).json({
				msg: "User already exists, try another !!",
			});
		}

		if (!validateName(name))
			return res.status(400).json({
				msg: "Please enter name with proper case and capital letter !",
			});

		if (username.length < 5 || username.length > 20)
			return res
				.status(400)
				.json({msg: "Username should be beetween 6 and 20"});

		if (!validateUsername(username))
			return res.status(400).json({msg: "Username should be alphanumeric !"});

		if (!validateEmail(loweremail))
			return res.status(400).json({msg: "Please enter valid email address !"});

		if (!validatePassword(password))
			return res.status(400).json({
				msg: "Password must contain one uppercase, symbol, number, and atleast 8 characters !",
			});

		const hashPassword = bcrypt.hashSync(password, 12);

		const newUser = {
			name,
			username,
			loweremail,
			hashPassword,
		};
		console.log(newUser);

		const activateToken = createToken(newUser, process.env.ACTIVATE, "5min");

		const link = `${process.env.CLIENT_URL}/auth/activate/${activateToken}`;

		const sendRes = sendmail(
			loweremail,
			link,
			"Activate your email ",
			"Please follow the link to activate your email. we dont provide any kindas of spamming links and so on.",
			username
		)
			.then((data) => {
				if (data == true) {
					return res.status(200).json({
						msg: `please check your email - ${loweremail}  for activation !`,
					});
				} else {
					return res.status(500).json({
						msg: `Failed to send mail !!`,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({
					msg: `Failed to send mail !!`,
				});
			});
	} catch (err) {
		return res.status(500).json({err});
	}
};

module.exports = userRegister;
