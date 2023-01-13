const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const { ConnectDb } = require("./connections/mongDBconnect");
const BlogRouter = require("./Routes/blogs");
const messageRouter=require("./Routes/messages");
const userRouter=require("./Routes/users");
const {
  handleBadRequest,
  handleNotefound,
  handleInternalServerError,
} = require("./middlewares/handleNotefound");
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(BlogRouter);
app.use('/messages',messageRouter);
app.use('/admin',userRouter);

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
