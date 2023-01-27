"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectDb = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ConnectDb = url => {
  return _mongoose.default.connect(url);
};
exports.ConnectDb = ConnectDb;