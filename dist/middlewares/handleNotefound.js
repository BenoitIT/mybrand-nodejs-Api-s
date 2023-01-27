"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNotefound = exports.handleInternalServerError = exports.handleBadRequest = void 0;
const handleBadRequest = (req, res) => {
  return res.status(400).json({
    message: "bad request made"
  });
};
exports.handleBadRequest = handleBadRequest;
const handleNotefound = (req, res) => {
  return res.status(404).json({
    message: "request not found"
  });
};
exports.handleNotefound = handleNotefound;
const handleInternalServerError = (req, res) => {
  return res.status(500).json({
    message: "internal server error"
  });
};
exports.handleInternalServerError = handleInternalServerError;