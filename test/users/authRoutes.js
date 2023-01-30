import express from "express";
import { createUser, login } from "../users/auth";
//import { auth } from "../middlewares/auth";
export const UserRouter = express.Router();
UserRouter.route("/register").post(createUser);
UserRouter.route("/login").post(login);

