const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Please enter your name !'],
	},
	username: {
		type: String,
		trim: true,
		required: [true, 'Please enter your username !'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Please enter your email !'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please enter your Password !'],
	},
	avatar: {
		type: String,
		default: 'image',
	},
	role: {
		type: Number,
		default: 0,
	},
	lastloginip: {
		type: String,
		default: '',
	},
	lastloginmac: {
		type: String,
		default: '',
	},
	lastlogintime: {
		type: String,
		default: '',
	},
	lastloginattempts: {
		type: Number,
		default: 0,
	},
	totallogin: {
		type: Number,
		default: 0,
	},
	usersSearch: {
		type: Array,
	},
});

module.exports = mongoose.model('User', userSchema);
