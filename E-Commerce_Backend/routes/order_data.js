const express = require("express");
const router = express.Router();

const { postOrder, updateOrderStatus } = require("../controller/order_data");

router.route("/postOrder").post(postOrder);
router.route("/postOrder/:id").post(postOrder);
router.route("/updateOrderStatus").post(updateOrderStatus);

module.exports = router;
