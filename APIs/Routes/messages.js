import express from "express"
import {auth} from '../middlewares/auth'
import {
  getAll,
  readOne,
  createMessage,
  deleteMes,
} from "../controllers/messages";
export const MessageRouter = express.Router();
//messages routes
MessageRouter.route("/").get(auth,getAll).post(createMessage);
MessageRouter.route("/message/:id").get(auth,readOne).delete(auth,deleteMes);
