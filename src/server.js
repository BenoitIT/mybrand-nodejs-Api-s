import express from "express"
import mongoose from "mongoose";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { JSend } from "jsend-express";
import { ConnectDb } from "./connections/mongDBconnect.js";
import {BlogRouter} from "./Routes/blogs.js";
import {MessageRouter} from "./Routes/messages.js";
import  { UserRouter} from "./Routes/users.js";
import { docrouter } from "./documentation/swagger.doc.js";
//import { corsOpts } from "./middlewares/corsOption.js";
import  {
  handleBadRequest,
  handleNotefound,
  handleInternalServerError,
} from "./middlewares/handleNotefound.js";

const app = express();
const jSend = new JSend({ name: 'mybrand', version: 'X.X.X', release: 'XX' });
dotenv.config();
//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'authentication');
  next();
});
//app.use(cors(corsOpts));
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
  const dBConn = await ConnectDb(process.env.mongoDbURL);
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
