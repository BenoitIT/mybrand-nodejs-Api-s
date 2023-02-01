import express from "express";
import {auth,Admin,} from '../middlewares/auth';
import {
  getAll,
  readOne,
  createMessage,
  deleteMes,
} from "../controllers/messages";
export const MessageRouter = express.Router();
//messages routes
MessageRouter.get("/all",auth,Admin,getAll);
MessageRouter.post("/new",createMessage);
MessageRouter.get("/message/:id",auth,Admin,readOne);
MessageRouter.delete("/message/delete/:id",auth,Admin,deleteMes);
