const JWT = require("jsonwebtoken");
const {asyncWrapper}=require('../middlewares/asyncWrapper')
require("dotenv").config();
const auth = asyncWrapper(async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(403).json({ message: `access denied for this page`});
  }
  const mainToken = await token.split(" ")[1];
  const decordedToken = await JWT.verify(mainToken, process.env.APP_SECRET);
  req.authuser = decordedToken;
  next();
})
module.exports= {auth}