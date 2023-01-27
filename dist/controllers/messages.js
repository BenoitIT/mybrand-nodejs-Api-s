"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readOne = exports.getAll = exports.deleteMes = exports.createMessage = void 0;
var _messages = _interopRequireDefault(require("../models/messages"));
var _asyncWrapper = require("../middlewares/asyncWrapper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAll = async (req, res) => {
  const message = await _messages.default.find({});
  res.json({
    message
  });
};
exports.getAll = getAll;
const createMessage = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const message = await _messages.default.create({
    senderName: req.body.senderName,
    senderEmail: req.body.senderEmail,
    subject: req.body.subject,
    message: req.body.message
  });
  res.status(201).json({
    message: "message sent"
  });
});
exports.createMessage = createMessage;
const readOne = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const {
    id
  } = req.params;
  const message = await _messages.default.findOne({
    _id: id
  }).exec();
  if (message) {
    res.json({
      message
    });
  }
  return res.status(402).json({
    message: `no id found`
  });
});
exports.readOne = readOne;
const deleteMes = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const {
    _id
  } = req.params;
  await _messages.default.findByIdAndDelete({
    _id
  });
  res.json({
    message: "message is removed"
  });
});
exports.deleteMes = deleteMes;