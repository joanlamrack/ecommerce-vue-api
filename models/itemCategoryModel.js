const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const fields = {
	name: String,
	itemlist: [{
		type: Schema.Types.ObjectId,
		ref: "item"
	}]
};

let itemCategorySchema = new Schema(fields);

module.exports = mongoose.model("itemCategory", itemCategorySchema);
