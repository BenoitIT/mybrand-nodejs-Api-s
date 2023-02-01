import mongoose from "mongoose";
const Schema = mongoose.Schema
const userSChema = new Schema({
  userName:{
   type:String,
   required:true
  },
  email: {
    unique: [true, "this email is arleady exist"],
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ],
    required: true
  },
  password:{
    type:String,
    required:[true,'password should not be empty'],
    trim:true,
    minLength:6
},
isAdmin: {
  type: Boolean
},
refreshToken:String
});
export default mongoose.model("User", userSChema);
