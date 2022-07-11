const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

require("dotenv").config({path: "./config/config.env"});

const app = express();

// routers
const authRoute = require("./routes/authRoutes");
const roomRoute = require("./routes/roomRoutes");

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("tiny"));

const PORT = process.env.PORT ?? 8080;
const URI = process.env.db;

// routes configuration
app.use("/user", authRoute);
app.use("/room", roomRoute);

mongoose.connect(URI, (err) => {
	if (err) return console.log(err);

	app.listen(PORT, () => {
		console.log(`server is listenting on ${PORT} in ${process.env.NODE_ENV}.`);
	});
});
