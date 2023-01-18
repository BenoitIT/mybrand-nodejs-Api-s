import  User from "../../models/users";
import Bcrypt from "bcrypt";
import loadash from "lodash";
import  JWT from "jsonwebtoken";
require("dotenv").config();
import  { asyncWrapper } from "../../middlewares/asyncWrapper";
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
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.json(loadash.pick(user, ["userName", "email"]));
  }
});
//login function
export const login = asyncWrapper(async (req, res) => {
  const cookie = req.headers?.cookie;
  if (cookie) {
    let cookieValues=cookie.split(';');
    const ActiveRefreshToken=cookieValues.find(value=>value.startsWith('refreshToken')).substring(13);
     let user = await User.findOne({ refreshToken:ActiveRefreshToken }).exec();
  if(user){
    const accessToken = JWT.sign(
      { _id: user._id, email: user.email },
      process.env.APP_SECRET,
      { expiresIn: "3600s" }
    );
     //store refresh token in cookies
    res.json({ message: "welcome",accessToken });
  }
  else{
    res.sendStatus(403)
  }
  } else {
    //in case the user has been logged out
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.json({ message: "enter email and password" });
    }
    let user = await User.findOne({ email }).exec();
    if (user) {
      const checkedpassword = await Bcrypt.compare(password, user.password);
      if (checkedpassword) {
        //generate tokens
        const accessToken = JWT.sign(
          { _id: user._id, email: user.email },
          process.env.APP_SECRET,
          { expiresIn: "300s" }
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
        user.refreshToken=refreshToken
        await user.save()
        res.json({ message: "welcome", accessToken });
      }
    } else {
      res.json({ message: "incorrect username and password" });
    }
  }
});
