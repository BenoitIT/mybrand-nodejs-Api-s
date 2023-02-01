import User from "../../src/models/users";
import Bcrypt from "bcrypt";
import loadash from "lodash";
import JWT from "jsonwebtoken";
require("dotenv").config();
import { asyncWrapper } from "../../src/middlewares/asyncWrapper";
//create user function
export const createUser = asyncWrapper(async (req, res) => {
  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(req.body.password, salt);
  const { userName, email } = req.body;
  if (!userName) {
    res.json({ message: `username field is empty` });
  }
  if (!email) {
    res.json({ message: `email field is empty` });
  } else {
    const currentEmail=await User.findOne({email})
     if(!currentEmail){
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      isAdmin:true
    });
    res.status(201).json(loadash.pick(user, ["userName", "email"]));
  }
  else{
    res.status(409).json({status:'fail',message:'the user email already exist'})
  }
}
});
//login function
export const login = asyncWrapper(async (req, res) => {
  
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.status(403).json({ message: "enter email and password" });
    }
    let user = await User.findOne({ email }).exec();
    if (user) {
      const checkedpassword = await Bcrypt.compare(password, user.password);
      if (checkedpassword) {
        //generate tokens
        const accessToken = JWT.sign(
          { _id: user._id, email: user.email,isAdmin:user.isAdmin },
          process.env.APP_SECRET,
        );
        
        res.setHeader("Authorization", `Bearer ${ accessToken}`);
        res.status(200).send({
          status: "success",
          message: 'welcome ',
          data:accessToken,
        });
      }
    } else {
      res.json({ message: "incorrect username and password" });
    }
})
