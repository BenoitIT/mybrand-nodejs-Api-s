import express from "express";
import {auth} from '../middlewares/auth';
import {
  getAll,
  readOne,
  createMessage,
  deleteMes,
} from "../controllers/messages";
export const MessageRouter = express.Router();
//messages routes
MessageRouter.get('/Api/messages/all',auth,getAll);
MessageRouter.post('/Api/messages/new',createMessage);
MessageRouter.get("messages/message/:id",auth,readOne);
MessageRouter.delete("messages/message/delete/:id",auth,deleteMes);
