const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const fields = {
	name: String,
	price: Number,
	stock: Number,
	store: {
		type: Schema.Types.ObjectId,
		ref: "store"
	}
};

let itemSchema = new Schema(fields);

module.exports = mongoose.model("item", itemSchema);
