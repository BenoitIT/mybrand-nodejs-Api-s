"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const commentSchema = _mongoose.default.Schema({
  blog: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Blog'
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  },
  commentingDate: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model('Comment', commentSchema);
exports.default = _default;