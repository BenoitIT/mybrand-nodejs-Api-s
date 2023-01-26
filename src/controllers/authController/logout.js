import User from "../../models/users";
require("dotenv").config();
import { asyncWrapper } from "../../middlewares/asyncWrapper";
export const logout = asyncWrapper(async (req, res) => {
    const cookie = req.headers?.cookie;
      if (cookie) {
      let cookieValues=cookie.split(';');
      const ActiveRefreshToken=cookieValues.find(value=>value.startsWith('refreshToken')).substring(13);
      if(!ActiveRefreshToken)return res.json({message:'logged out'})
      let user = await User.findOne({ refreshToken:ActiveRefreshToken}).exec();
      //delete refresh token in databse
        user.refreshToken=''
        await user.save()
        res.clearCookie("refreshToken");
        res.json({ message: "you logged out" });
        res.end()
          }
     });

