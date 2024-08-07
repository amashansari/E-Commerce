const express = require("express");
const router = express.Router();

const { postUserQuery, getUserQuery, getAllUserQuery,updateQueryStatus } = require("../controller/user_query");

router.route("/postUserQuery").post(postUserQuery);
router.route("/getUserQuery/:user_id").get(getUserQuery);
router.route("/getAllUserQuery").get(getAllUserQuery);
router.route("/updateQueryStatus").post(updateQueryStatus);

module.exports = router;
