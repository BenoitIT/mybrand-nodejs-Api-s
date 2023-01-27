"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _users = require("../controllers/authController/users");
var _logout = require("../controllers/authController/logout");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//import { auth } from "../middlewares/auth";
const UserRouter = _express.default.Router();
exports.UserRouter = UserRouter;
UserRouter.route("/register").post(_users.createUser);
UserRouter.route("/login").post(_users.login);
UserRouter.route("/logout").post(_logout.logout);