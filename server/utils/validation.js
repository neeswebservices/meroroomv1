const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const validatePassword = (password) => {
	return String(password).match(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
	);
};

const validateUsername = (username) => {
	return String(username).match(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/);
};

const validateName = (name) => {
	return String(name).match(/^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$/);
};

module.exports = {
	validateEmail,
	validatePassword,
	validateUsername,
	validateName,
};
