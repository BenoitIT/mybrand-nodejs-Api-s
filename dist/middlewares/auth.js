"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require("dotenv").config();
const auth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.fail();
  }
  try {
    const mainToken = await token.split(" ")[1];
    const decordedToken = await _jsonwebtoken.default.verify(mainToken, process.env.APP_SECRET);
    req.authuser = decordedToken;
    next();
  } catch (ex) {
    return res.status(400).json({
      message: "access get expired!,login again"
    });
  }
};
exports.auth = auth;