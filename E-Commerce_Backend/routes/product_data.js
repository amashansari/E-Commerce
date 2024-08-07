const express = require("express");
const router = express.Router();

const { getAllProduct, addProductsToCatelogue } = require("../controller/product_data");

router.route("/getAllProduct").get(getAllProduct);
router.route("/addProductsToCatelogue").post(addProductsToCatelogue);

module.exports = router;
