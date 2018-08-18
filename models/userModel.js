const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const fields = {
	username: String,
	password: String,
	email: String,
	cart: [{
		type: Schema.Types.ObjectId,
		ref: "item"
	}],
	purchase: [{
		type:Schema.Types.ObjectId,
		ref: "item"
	}]
};

let userSchema = new Schema(fields);
module.exports = mongoose.model("user", userSchema);
