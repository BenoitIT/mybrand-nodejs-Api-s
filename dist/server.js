"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsendExpress = require("jsend-express");
var _mongDBconnect = require("./connections/mongDBconnect.js");
var _blogs = require("./Routes/blogs.js");
var _messages = require("./Routes/messages.js");
var _users = require("./Routes/users.js");
var _swaggerDoc = require("./documentation/swagger.doc.js");
var _handleNotefound = require("./middlewares/handleNotefound.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const jSend = new _jsendExpress.JSend({
  name: 'mybrand',
  version: 'X.X.X',
  release: 'XX'
});
_dotenv.default.config();
//middlewares
app.use(_swaggerDoc.docrouter);
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use(jSend.middleware.bind(jSend));
//routes
app.use(_blogs.BlogRouter);
app.use('/Api/messages', _messages.MessageRouter);
app.use('/Api/admin', _users.UserRouter);
app.use(_handleNotefound.handleBadRequest);
app.use(_handleNotefound.handleNotefound);
app.use(_handleNotefound.handleInternalServerError);

//start app configuration
const PORT = process.env.PORT;
_mongoose.default.set("strictQuery", true);
const startApp = async () => {
  const dBConn = await (0, _mongDBconnect.ConnectDb)(process.env.mongoDbURL);
  try {
    if (dBConn) {
      console.log("database connected successfully");
      app.listen(PORT, console.log(`application is listening to port ${PORT}....`));
    }
  } catch (ex) {
    console.log('could not connect to database');
  }
};
startApp();
module.exports = app;