const emptyReturn = (name, res) => {
	if (!name) return res.status(400).json({ msg: `Please enter ${name} !!` });
};

module.exports = {
	emptyReturn,
};
