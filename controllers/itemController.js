const itemModel = require("../models/itemModel.js");

/**
 * itemController.js
 *
 * @description :: Server-side logic for managing items.
 */
module.exports = {
	/**
	 * itemController.list()
	 */
	list: (req, res) => {
		itemModel.find(
			req.query.where,
			req.query.fields,
			req.query.sort,
			(err, items) => {
				if (err) {
					return res.status(500).json({
						message: "Error when getting item.",
						error: err
					});
				}
				return res.json(items);
			}
		);
	},

	/**
	 * itemController.show()
	 */
	show: (req, res) => {
		let id = req.params.id;
		itemModel.findOne({ _id: id }, (err, item) => {
			if (err) {
				return res.status(500).json({
					message: "Error when getting item.",
					error: err
				});
			}
			if (!item) {
				return res.status(404).json({
					message: "No such item"
				});
			}
			return res.json(item);
		});
	},

	/**
	 * itemController.create()
	 */
	create: (req, res) => {
		let item = new itemModel({
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			store: req.body.store,
			imgurl: req.body.imgurl
		});

		item.save((err, item) => {
			if (err) {
				return res.status(500).json({
					message: "Error when creating item",
					error: err
				});
			}
			return res.status(201).json(item);
		});
	},

	/**
	 * itemController.update()
	 */
	update: (req, res) => {
		let id = req.params.id;
		itemModel.findOne({ _id: id }, (err, item) => {
			if (err) {
				return res.status(500).json({
					message: "Error when getting item",
					error: err
				});
			}
			if (!item) {
				return res.status(404).json({
					message: "No such item"
				});
			}

			item.name = req.body.name ? req.body.name : item.name;
			item.price = req.body.price ? req.body.price : item.price;
			item.stock = req.body.stock ? req.body.stock : item.stock;
			item.store = req.body.store ? req.body.store : item.store;
			item.imgurl = req.body.imgurl ? req.body.imgurl : item.imgurl;

			item.save((err, item) => {
				if (err) {
					return res.status(500).json({
						message: "Error when updating item.",
						error: err
					});
				}

				return res.json(item);
			});
		});
	},

	/**
	 * itemController.remove()
	 */
	remove: (req, res) => {
		let id = req.params.id;
		itemModel.findByIdAndRemove(id, (err, item) => {
			if (err) {
				return res.status(500).json({
					message: "Error when deleting the item.",
					error: err
				});
			}
			return res.status(204).json();
		});
	}
};
