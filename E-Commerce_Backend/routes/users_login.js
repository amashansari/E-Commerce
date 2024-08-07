const express = require("express");
const router = express.Router();

const {
  getUsers_login,
  addUser_login,
  verify_user,
  getUserById,
} = require("../controller/users_login");

//---------------------------------------------- USERS_LOGIN ----------------------------------------------\\
router.route("/getUser_login").get(getUsers_login);
router.route("/addUser_login").post(addUser_login);

//---------------------------------------------- VERIFY EXISTING USER ----------------------------------------------\\
router.route("/verify_user").post(verify_user);

//---------------------------------------------- GET USER BY ID ----------------------------------------------\\
router.route("/getUserById/:id").get(getUserById);

module.exports = router;
