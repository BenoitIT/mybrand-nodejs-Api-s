const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  senderName: {
    type: String,
    required: [true, "please enter your name"],
  },
  senderEmail: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    required: true,
  },
  senderName: {
    type: String,
  },
  message: {
    type: String,
    required: [true, "message should not be empty"],
    trim: true,
    maxLength: 255,
  },
});
module.exports = mongoose.model("Message", messageSchema);
