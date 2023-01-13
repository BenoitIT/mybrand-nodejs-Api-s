const User = require("../../models/users");
require("dotenv").config();
const { asyncWrapper } = require("../../middlewares/asyncWrapper");
const logout = asyncWrapper(async (req, res) => {
    const cookie = req.headers?.cookie;
    if (cookie) {
      let cookieValue=cookie.split(';');
      ActiveRefreshToken=cookieValue[0].substring(13)
      let user = await User.findOne({ refreshToken:ActiveRefreshToken}).exec();
      //delete refresh token in databse
        user.refreshToken=''
        await user.save()
        res.clearCookie("refreshToken");
        res.json({ message: "you logged out" });
        res.end()
       //send access token in header

    }
     });
  module.exports = {logout };
