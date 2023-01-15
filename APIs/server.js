import express from "express"
import mongoose from "mongoose";

import bodyParser from "body-parser";
import dotenv from "dotenv";

import { ConnectDb } from "./connections/mongDBconnect";
import {BlogRouter} from "./Routes/blogs";
import {MessageRouter} from "./Routes/messages";
import  { UserRouter} from "./Routes/users";
import  {
  handleBadRequest,
  handleNotefound,
  handleInternalServerError,
} from "./middlewares/handleNotefound";
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(BlogRouter);
app.use('/messages',MessageRouter);
app.use('/admin', UserRouter);

app.use(handleBadRequest);
app.use(handleNotefound);
app.use(handleInternalServerError);


const PORT = process.env.PORT;
mongoose.set("strictQuery", true);
const startApp = async () => {
  const dBConn = await ConnectDb(process.env.mongoDbURL);
  if (dBConn) {
    console.log("database connected successfully");
    app.listen(
      PORT,
      console.log(`application is listening to port ${PORT}....`)
    );
  } else {
    console.log("failed to connected to the server");
  }
};
startApp();
