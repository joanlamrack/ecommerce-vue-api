const itemCategoryModel = require("../models/itemCategoryModel.js");

/**
 * itemCategoryController.js
 *
 * @description :: Server-side logic for managing itemCategorys.
 */
module.exports = {
	/**
	 * itemCategoryController.list()
	 */
	list: (req, res) => {
		itemCategoryModel
			.populate("itemList")
			.find(
				req.query.where,
				req.query.fields,
				req.query.sort,
				(err, itemCategorys) => {
					if (err) {
						return res.status(500).json({
							message: "Error when getting itemCategory.",
							error: err
						});
					}
					return res.json(itemCategorys);
				}
			);
	},

	/**
	 * itemCategoryController.show()
	 */
	show: (req, res) => {
		let id = req.params.id;
		itemCategoryModel
			.populate("itemList")
			.findOne({ _id: id }, (err, itemCategory) => {
				if (err) {
					return res.status(500).json({
						message: "Error when getting itemCategory.",
						error: err
					});
				}
				if (!itemCategory) {
					return res.status(404).json({
						message: "No such itemCategory"
					});
				}
				return res.json(itemCategory);
			});
	},

	/**
	 * itemCategoryController.create()
	 */
	create: (req, res) => {
		let itemCategory = new itemCategoryModel({
			name: req.body.name,
			itemList: req.body.itemList
		});

		itemCategory.save((err, itemCategory) => {
			if (err) {
				return res.status(500).json({
					message: "Error when creating itemCategory",
					error: err
				});
			}
			return res.status(201).json(itemCategory);
		});
	},

	/**
	 * itemCategoryController.update()
	 */
	update: (req, res) => {
		let id = req.params.id;
		itemCategoryModel.findOne({ _id: id }, (err, itemCategory) => {
			if (err) {
				return res.status(500).json({
					message: "Error when getting itemCategory",
					error: err
				});
			}
			if (!itemCategory) {
				return res.status(404).json({
					message: "No such itemCategory"
				});
			}

			itemCategory.name = req.body.name ? req.body.name : itemCategory.name;
			itemCategory.itemList = req.body.itemList
				? req.body.itemList
				: itemCategory.itemList;

			itemCategory.save((err, itemCategory) => {
				if (err) {
					return res.status(500).json({
						message: "Error when updating itemCategory.",
						error: err
					});
				}

				return res.json(itemCategory);
			});
		});
	},

	/**
	 * itemCategoryController.remove()
	 */
	remove: (req, res) => {
		let id = req.params.id;
		itemCategoryModel.findByIdAndRemove(id, (err, itemCategory) => {
			if (err) {
				return res.status(500).json({
					message: "Error when deleting the itemCategory.",
					error: err
				});
			}
			return res.status(204).json();
		});
	}
};
