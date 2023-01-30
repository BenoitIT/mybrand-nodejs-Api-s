import express from "express"
import mongoose from "mongoose";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import { JSend } from "jsend-express";
import { ConnectDb } from "../src/connections/mongDBconnect";
import {BlogRouter} from "../src/Routes/blogs.js";
import {MessageRouter} from "../src/Routes/messages";
import  { UserRouter} from "../test/users/authRoutes";
import { docrouter } from "../src/documentation/swagger.doc";
import  {
  handleBadRequest,
  handleNotefound,
  handleInternalServerError,
} from "../src/middlewares/handleNotefound";

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
//routesa
app.use(BlogRouter);
app.use('/Api/messages',MessageRouter);
app.use('/Api/admin', UserRouter);

app.use(handleBadRequest);
app.use(handleNotefound);
app.use(handleInternalServerError);

//start app configuration
const PORT = process.env.PORT;
mongoose.set("strictQuery", true);
const startApp = async () => {
  const dBConn = await ConnectDb(process.env.TESTDB);
  try{
    if (dBConn) {
      console.log("database connected successfully");
      app.listen(
        PORT,
        console.log(`application is listening to port ${PORT}....`)
      );
    }}catch(ex){
      console.log('could not connect to database')
    }
  }
  startApp();
export default app;