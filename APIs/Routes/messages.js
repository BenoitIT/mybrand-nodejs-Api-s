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
MessageRouter.get("/all",auth,getAll);
MessageRouter.post("/new",createMessage);
MessageRouter.get("/message/:id",auth,readOne);
MessageRouter.delete("/message/delete/:id",auth,deleteMes);
