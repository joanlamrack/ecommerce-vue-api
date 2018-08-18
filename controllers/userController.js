const userModel = require("../models/userModel.js");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
	/**
	 * userController.list()
	 */
	list: (req, res) => {
		userModel.find(
			req.query.where,
			req.query.fields,
			req.query.sort,
			(err, users) => {
				if (err) {
					return res.status(500).json({
						message: "Error when getting user.",
						error: err
					});
				}
				return res.json(users);
			}
		);
	},

	/**
	 * userController.show()
	 */
	show: (req, res) => {
		let id = req.params.id;
		userModel.findOne({ _id: id }, (err, user) => {
			if (err) {
				return res.status(500).json({
					message: "Error when getting user.",
					error: err
				});
			}
			if (!user) {
				return res.status(404).json({
					message: "No such user"
				});
			}
			return res.json(user);
		});
	},

	/**
	 * userController.create()
	 */
	create: (req, res) => {
		let user = new userModel({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			cart: req.body.cart,
			purchase: req.body.purchase
		});

		user.save((err, user) => {
			if (err) {
				return res.status(500).json({
					message: "Error when creating user",
					error: err
				});
			}
			return res.status(201).json(user);
		});
	},

	/**
	 * userController.update()
	 */
	update: (req, res) => {
		let id = req.params.id;
		userModel.findOne({ _id: id }, (err, user) => {
			if (err) {
				return res.status(500).json({
					message: "Error when getting user",
					error: err
				});
			}
			if (!user) {
				return res.status(404).json({
					message: "No such user"
				});
			}

			user.username = req.body.username ? req.body.username : user.username;
			user.password = req.body.password ? req.body.password : user.password;
			user.email = req.body.email ? req.body.email : user.email;
			user.cart = req.body.cart ? req.body.cart : user.cart;
			user.purchase = req.body.purchase ? req.body.purchase : user.purchase;

			user.save((err, user) => {
				if (err) {
					return res.status(500).json({
						message: "Error when updating user.",
						error: err
					});
				}

				return res.json(user);
			});
		});
	},

	/**
	 * userController.remove()
	 */
	remove: (req, res) => {
		let id = req.params.id;
		userModel.findByIdAndRemove(id, (err, user) => {
			if (err) {
				return res.status(500).json({
					message: "Error when deleting the user.",
					error: err
				});
			}
			return res.status(204).json();
		});
	}
};
