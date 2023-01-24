import express from "express"
import mongoose from "mongoose";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import { JSend } from "jsend-express";
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
const jSend = new JSend({ name: 'mybrand', version: 'X.X.X', release: 'XX' });
dotenv.config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(jSend.middleware.bind(jSend))

app.use(BlogRouter);
app.use('/Api/messages',MessageRouter);
app.use('/Api/admin', UserRouter);

app.use(handleBadRequest);
app.use(handleNotefound);
app.use(handleInternalServerError);


const PORT = process.env.PORT;
mongoose.set("strictQuery", true);
const startApp = async () => {
  const dBConn = await ConnectDb(process.env.mongoDbURL);
  try{
  if (dBConn) {
    console.log("database connected successfully");
    app.listen(
      PORT,
      console.log(`application is listening to port ${PORT}....`)
    );
  }}catch(ex){
   console.log('could not connect to database');
  }
}
startApp();
module.exports=app;