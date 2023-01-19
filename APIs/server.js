import express from "express"
import mongoose from "mongoose";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import { JSend } from "jsend-express";
import { ConnectDb } from "./connections/mongDBconnect";
import {BlogRouter} from "./Routes/blogs";
import {MessageRouter} from "./Routes/messages";
import  { UserRouter} from "./Routes/users";
import { docrouter } from "./documentation/swagger.doc";
import  {
  handleBadRequest,
  handleNotefound,
  handleInternalServerError,
} from "./middlewares/handleNotefound";

const app = express();
const jSend = new JSend({ name: 'mybrand', version: 'X.X.X', release: 'XX' });
dotenv.config();
//middlewares
app.use(docrouter);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(jSend.middleware.bind(jSend))
//routes
app.use(BlogRouter);
app.use('/Api/messages',MessageRouter);
app.use('/Api/admin', UserRouter);

app.use(handleBadRequest);
app.use(handleNotefound);
app.use(handleInternalServerError);

//start app configuration
const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`application is listening to port ${PORT}....`)
);
mongoose.set("strictQuery", true);
const startApp = async () => {
  try{
  const dBConn = await ConnectDb(process.env.mongoDbURL);
  if (dBConn) {
    console.log("database connected successfully");
  }}catch(ex){
   console.log('could not connect to database')
  }
}
startApp();
