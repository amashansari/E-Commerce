const express = require("express");
const router = express.Router();

const {
    registeAdmin, verifyAdmin
} = require("../controller/admin_login");

//---------------------------------------------- REGISTER ADMIN ----------------------------------------------\\
router.route("/registeAdmin").post(registeAdmin);

//---------------------------------------------- VERIFY ADMIN ----------------------------------------------\\
router.route("/verifyAdmin").post(verifyAdmin);


module.exports = router;
