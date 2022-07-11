const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Enter the name of room."],
		trim: true,
	},
	ownername: {
		type: String,
		required: [true, "Enter the ownername of room."],
		trim: true,
	},
	address: {
		type: String,
		required: [true, "Enter the address of room."],
		trim: true,
	},
	viewpointaddress: {
		type: String,
		trim: true,
	},
	district: {
		type: String,
		trim: true,
		required: [true, "Please enter the name of district"],
	},
	registeredby: {
		type: String,
		trim: true,
		required: [true, "Id of user"],
	},
	totalrooms: {
		type: Number,
		default: 1,
		required: [true, "Room number shouldn't be empty"],
	},
	mobileno: {
		type: String,
		required: [true, "Please enter your mobile number."],
	},
	telno: String,
	floor: {
		type: Number,
		required: [true, "Please enter the room floor."],
	},
	appropriateseaters: {
		type: Number,
		required: [true, "Please enter a number of seaters"],
		trim: true,
		default: 1,
	},
	price: {
		type: Number,
		min: 500,
		required: [true, "Please enter a price for your room."],
	},
	area: String,
	mainfor: String,
	gmaplink: String,
	facebooklink: String,
	businessemail: {
		type: String,
		lowercase: true,
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	featured: [String],
	tags: [String],
	description: {
		type: String,
		required: [true, "Please enter your descripion"],
		trim: true,
	},
	images: [String],
	category: {
		type: String,
		default: "rooms",
	},
	totalviews: Number,
	totalreviews: Number,
	totallikes: Number,
	totalbookings: Number,
	totalcomments: Number,
	comments: Array,
});

roomSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

module.exports = mongoose.model("Room", roomSchema);
