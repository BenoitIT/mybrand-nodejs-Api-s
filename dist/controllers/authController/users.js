"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.createUser = void 0;
var _users = _interopRequireDefault(require("../../models/users"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _lodash = _interopRequireDefault(require("lodash"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _asyncWrapper = require("../../middlewares/asyncWrapper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require("dotenv").config();
//create user function
const createUser = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const salt = await _bcrypt.default.genSalt(10);
  const hashedPassword = await _bcrypt.default.hash(req.body.password, salt);
  const {
    userName,
    email
  } = req.body;
  if (!userName) {
    res.json({
      message: `username field is empty`
    });
  }
  if (!email) {
    res.json({
      message: `email field is empty`
    });
  } else {
    const user = await _users.default.create({
      userName,
      email,
      password: hashedPassword
    });
    res.json(_lodash.default.pick(user, ["userName", "email"]));
  }
});
//login function
exports.createUser = createUser;
const login = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const cookie = req.headers?.cookie;
  let ActiveRefreshToken;
  if (cookie) {
    let cookieValues = cookie.split(";");
    ActiveRefreshToken = cookieValues.find(value => value.startsWith("refreshToken")).substring(13);
  }
  if (ActiveRefreshToken) {
    let user = await _users.default.findOne({
      refreshToken: ActiveRefreshToken
    }).exec();
    if (user) {
      const accessToken = _jsonwebtoken.default.sign({
        _id: user._id,
        email: user.email
      }, process.env.APP_SECRET, {
        expiresIn: "3600s"
      });
      //store refresh token in cookies
      res.json({
        message: "welcome",
        accessToken
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    //in case the user has been logged out
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.json({
        message: "enter email and password"
      });
    }
    let user = await _users.default.findOne({
      email
    }).exec();
    if (user) {
      const checkedpassword = await _bcrypt.default.compare(password, user.password);
      if (checkedpassword) {
        //generate tokens
        const accessToken = _jsonwebtoken.default.sign({
          _id: user._id,
          email: user.email
        }, process.env.APP_SECRET, {
          expiresIn: "3600s"
        });
        const refreshToken = _jsonwebtoken.default.sign({
          _id: user._id,
          email: user.email
        }, process.env.APP_SECRET, {
          expiresIn: "10d"
        });
        //store refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 2000
        });
        //store refreshToken in databse
        user.refreshToken = refreshToken;
        await user.save();
        res.json({
          message: "welcome",
          accessToken
        });
      }
    } else {
      res.json({
        message: "incorrect username and password"
      });
    }
  }
});
exports.login = login;