"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Schema = _mongoose.default.Schema;
const userSChema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    unique: [true, "this email is arleady exist"],
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    required: true
  },
  password: {
    type: String,
    required: [true, 'password should not be empty'],
    trim: true,
    minLength: 6
  },
  refreshToken: String
});
var _default = _mongoose.default.model("User", userSChema);
exports.default = _default;