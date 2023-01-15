import express from "express";
import { createUser, login } from "../controllers/authController/users";
import { logout } from "../controllers/authController/logout";
export const UserRouter = express.Router();
UserRouter.route("/register").post(createUser);
UserRouter.route("/login").post(login);
UserRouter.route("/logout").post(logout);

