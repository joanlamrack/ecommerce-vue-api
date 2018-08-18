const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const fields = {
	name: String,
	price: Number,
	stock: Number,
	store: String,
	imgurl: String
};

let itemSchema = new Schema(fields);

module.exports = mongoose.model("item", itemSchema);
