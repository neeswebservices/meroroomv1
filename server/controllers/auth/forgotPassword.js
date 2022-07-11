const {emptyReturn} = require("../../utils/return");
const User = require("../../models/auth/userModel");
const {validatePassword} = require("../../utils/validation");
const {createToken} = require("../../utils/token");
const sendmail = require("../../utils/sendmail");

const forgotPassword = async (req, res, next) => {
	const {email, newpassword} = req.body;
	if (!email) return res.status(400).json({msg: "Please enter email !!"});

	const user = await User.findOne({email});
	if (!user) return res.status(400).json({msg: "User doesn't exists !!"});

	if (!newpassword)
		return res.status(400).json({msg: "Please enter newpassword !!"});

	if (!validatePassword(newpassword))
		return res.status(400).json({
			msg: "Password should contain atleast one symbol, number, capital letter and atleast 8 characters !",
		});

	const resetToken = createToken(
		{id: user._id, email, newpassword},
		process.env.RESET,
		"15min"
	);

	const link = `${process.env.CLIENT_URL}/auth/reset/${resetToken}`;

	const sendRes = sendmail(
		email,
		link,
		"Reset your Password ",
		"Please follow the link to reset your password. we dont provide any kindas of spamming links and so on.",
		user.username
	)
		.then((data) => {
			if (data == true) {
				return res.status(200).json({
					msg: `please check your email - ${email}  for reset link !`,
				});
			} else {
				return res.status(200).json({
					msg: `Failed to send mail !!`,
				});
			}
		})
		.catch((err) => {
			console.log(err);
			return res.status(200).json({
				msg: `Failed to send mail !!`,
			});
		});
};

module.exports = forgotPassword;
