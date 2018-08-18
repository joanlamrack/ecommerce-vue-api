let express = require("express");
const router = express.Router();
const itemRoute = require("./item");
const userRoute = require("./user");
const itemCategory = require("./itemCategory");

router.use("/items", itemRoute);
router.use("/users", userRoute);
router.use("/category", itemCategory);

router.get("/",(req,res)=>{
	res.send("This API Works!");
});

module.exports = router;