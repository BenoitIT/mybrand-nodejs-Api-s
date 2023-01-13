const express = require("express");
const UserRouter = express.Router();
const { createUser, login } = require("../controllers/authController/users");
const { logout } = require("../controllers/authController/logout");
UserRouter.route("/register").post(createUser);
UserRouter.route("/login").post(login);
UserRouter.route("/logout").post(logout);
module.exports = UserRouter;
