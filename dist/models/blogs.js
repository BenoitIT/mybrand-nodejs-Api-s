"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
require("mongoose-type-url");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const blogsSchema = _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 255
  },
  category: {
    type: String,
    required: true
  },
  blogImage: {
    type: _mongoose.default.SchemaTypes.Url,
    required: true
  },
  blogDescription: {
    type: String,
    required: true
  },
  comments: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});
var _default = _mongoose.default.model("Blog", blogsSchema);
exports.default = _default;