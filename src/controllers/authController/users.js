import User from "../../models/users";
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
require("dotenv").config();
import { asyncWrapper } from "../../middlewares/asyncWrapper";
//create user function
export const createUser = asyncWrapper(async (req, res) => {
  const salt = await Bcrypt.genSalt(10);
  const hashedPassword = await Bcrypt.hash(req.body.password, salt);
  const { userName, email } = req.body;
  if (!userName) {
    return res.json({ message: `username field is empty` });
  }
  if (!email) {
    return res.json({ message: `email field is empty` });
  } else {
    const currentEmail=await User.findOne({email}).exec()
     if(!currentEmail){
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      isAdmin:false
    });
    const accessToken = JWT.sign(
      { _id: user._id, 
        email: user.email,
        isAdmin: user.isAdmin},
      process.env.APP_SECRET,
      { expiresIn: "3600s" }
    );
    res.status(201).json({message:'account successfully created',
                          data:accessToken});
  }
  else{
    res.status(409).json({status:'fail',message:'the user email already exist'})
  }
}
});
//login function
export const login = asyncWrapper(async (req, res) => {
  const cookie = req.headers?.cookie;
  let ActiveRefreshToken;
    if (cookie) {
   let cookieValues = cookie.split(";");
   ActiveRefreshToken = cookieValues
      .find((value) => value.startsWith("refreshToken"))
      .substring(13);
  }
    if (ActiveRefreshToken) {
      let user = await User.findOne({
        refreshToken: ActiveRefreshToken,
      }).exec();
      if (user) {
        const accessToken = JWT.sign(
          { _id: user._id, 
            email: user.email,
            isAdmin: user.isAdmin},
          process.env.APP_SECRET,
          { expiresIn: "3600s" }
        );
        res.status(200).json({ message: "welcome", data:accessToken });
      } else {
        res.clearCookie("refreshToken");
        res.sendStatus(403);
      }
    }
   else {
    //in case the user has been logged out
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.json({ message: "enter email and password" });
    }
    let user = await User.findOne({ email }).exec();
    if (user) {
      const checkedpassword = await Bcrypt.compare(password, user.password);
      if (checkedpassword) {
        //generate tokens
        const accessToken = JWT.sign(
          { _id: user._id, 
            email: user.email,
            isAdmin: user.isAdmin },
          process.env.APP_SECRET,
          { expiresIn: "3600s" }
        );
        const refreshToken = JWT.sign(
          { _id: user._id, email: user.email },
          process.env.APP_SECRET,
          { expiresIn: "10d" }
        );
        //store refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 2000,
        });
        //store refreshToken in databse
        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).json({ message: "welcome",data:accessToken });
      }
    } else {
      res.json({ message: "incorrect username and password" });
    }
  }
});
