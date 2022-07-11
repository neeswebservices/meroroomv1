const nodemailer = require('nodemailer');

const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const config = process.env;

const sendmail = async (to, url, subject, msg, username = 'User') => {
	try {
		const oauth2client = new OAuth2(
			config.GMAIL_CLIENT_ID,
			config.GMAIL_CLIENT_SECRET,
			config.GMAIL_REDIRECT_URL
		);

		oauth2client.setCredentials({
			refresh_token: config.GMAIL_REFRESH_TOKEN,
		});

		const accessToken = await oauth2client.getAccessToken();

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				clientId: config.GMAIL_CLIENT_ID,
				clientSecret: config.GMAIL_CLIENT_SECRET,
				user: config.GMAIL_USER,
				refreshToken: config.GMAIL_REFRESH_TOKEN,
				accessToken,
			},
		});

		try {
			let info = await transporter.sendMail({
				from: config.GMAIL_USER,
				to: to,
				subject: subject,
				text: msg + url,
				html: `
				<div style="padding: 20px;font-family: sans-serif;  max-width: 600px; border: 6px solid #202020; background:black; color:white;font-family: Poppins;">
					<h1>Mero Room </h1>
					<div class="img" style="width: 100%;display: flex;align-items:center;justify-content:center;padding: 10px 0;">
					<img src="https://res.cloudinary.com/neeswebservice/image/upload/v1656492145/logos/mmm_c1zcl6.png" width="100px" alt="">
					</div>
					<strong>${subject} - Nees Web Services</strong>
					<h2 style="width: 100%; margin: 10px auto;">Hello ${username} !!</h2>
					<p>Please follow the link to ${subject}. we dont provide any kindas of spamming links and so on.</p>

					<a href="" style="margin: 20px auto;line-height: 2em;text-decoration: none;font-size: 22px;letter-spacing: 1px;text-align:right; cursor:pointer; padding: 5px 25px; border: none; outline: none;background:#303443;color:white;border-radius: 4px;">
					Click Here
					</a>
					<br />
					<p style="width: 100%;margin: 0;">
					If upper button doesn't works -
					</p>
					<a href="${url}" target="_blank" style="color: #ff4848;line-height: 18px;">
				${url}
					</a>
					<p style="width: 100%;">
					Reply from : neeswebservices ! <br />
					Reply to : ${to}

					< username>

					</p>
					<small> © 2022 meroroom. All rights reserved | Powered by NWS Inc.</small>
				</div>
					`,
			});
			console.log('Message sent' + info.messageId);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	} catch (er) {
		console.log(er);
		return false;
	}
};

module.exports = sendmail;
