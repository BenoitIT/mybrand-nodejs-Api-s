"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Schema = _mongoose.default.Schema;
const messageSchema = new Schema({
  senderName: {
    type: String,
    required: [true, "please enter your name"]
  },
  senderEmail: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    required: true
  },
  senderName: {
    type: String
  },
  message: {
    type: String,
    required: [true, "message should not be empty"],
    trim: true,
    maxLength: 255
  }
});
var _default = _mongoose.default.model("Message", messageSchema);
exports.default = _default;