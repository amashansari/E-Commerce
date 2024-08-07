const express = require("express");
const router = express.Router();

const { orderedData, orderedDataForAllUsers } = require("../controller/ordered_data");

router.route("/orderedData/:id").get(orderedData);
router.route("/orderedDataForAllUsers").get(orderedDataForAllUsers);

module.exports = router;
