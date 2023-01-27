"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = void 0;
var _users = _interopRequireDefault(require("../../models/users"));
var _asyncWrapper = require("../../middlewares/asyncWrapper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require("dotenv").config();
const logout = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const cookie = req.headers?.cookie;
  if (cookie) {
    let cookieValues = cookie.split(';');
    const ActiveRefreshToken = cookieValues.find(value => value.startsWith('refreshToken')).substring(13);
    if (!ActiveRefreshToken) return res.json({
      message: 'logged out'
    });
    let user = await _users.default.findOne({
      refreshToken: ActiveRefreshToken
    }).exec();
    //delete refresh token in databse
    user.refreshToken = '';
    await user.save();
    res.clearCookie("refreshToken");
    res.json({
      message: "you logged out"
    });
    res.end();
  }
});
exports.logout = logout;