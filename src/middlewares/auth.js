import JWT from 'jsonwebtoken';
require("dotenv").config();
export const auth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
       res.fail()
  }
  try{
   const mainToken = await token.split(" ")[1];
  const decordedToken = await JWT.verify(mainToken, process.env.APP_SECRET);
  req.authuser = decordedToken;
  next();
  }
  catch(ex){
     return res.status(400).json({
            message: "access get expired!,login again"
        })
  }
 };

 export const Admin = async(req, res, next) => {
    if (!req.authuser.isAdmin) {
        return res.status(403).json({ message: "access denied" })
    }
    next()
}
