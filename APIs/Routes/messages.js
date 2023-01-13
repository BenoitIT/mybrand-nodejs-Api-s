const express = require("express");
//const {auth}= require('../middlewares/auth')
const MessageRouter = express.Router();
const {
  getAll,
  readOne,
  createMessage,
  deleteMes,
} = require("../controllers/messages");

//messages routes
MessageRouter.route("/").get(getAll).post(createMessage);
MessageRouter.route("/message/:id").get(readOne).delete(deleteMes);
module.exports = MessageRouter;
