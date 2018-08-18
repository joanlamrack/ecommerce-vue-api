let express = require("express");
const router = express.Router();
const userRoute = require("./item");
const itemRoute = require("./user");

router.use("/items", itemRoute);
router.use("/users", userRoute);

router.get("/",(req,res)=>{
	res.send("This API Works!");
});

module.exports = router;