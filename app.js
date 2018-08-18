require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/index");

mongoose.connect(
	`mongodb://${process.env.MONGODBUSER}:${process.env.MONGODBPASS}@${
		process.env.MONGODBHOST
	}:${process.env.MONGODBPORT}/${process.env.MONGODBDATA}`,
	{ useNewUrlParser: true }
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
	console.log("Mongo DB connected!");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status).json({
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500).json({
		message: err.message,
		error: {}
	});
});

app.listen(3000, () => {
	console.log("Express connected!");
});

module.exports = app;
