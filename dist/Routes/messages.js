"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../middlewares/auth");
var _messages = require("../controllers/messages");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageRouter = _express.default.Router();
//messages routes
exports.MessageRouter = MessageRouter;
MessageRouter.get("/all", _auth.auth, _messages.getAll);
MessageRouter.post("/new", _messages.createMessage);
MessageRouter.get("/message/:id", _auth.auth, _messages.readOne);
MessageRouter.delete("/message/delete/:id", _auth.auth, _messages.deleteMes);