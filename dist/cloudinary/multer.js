"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// destination:(req,file,cb)=>{
//     cb(null,'/uploads')
// },
// filename:(req,file,cb)=>{
//     cb(null,Date.now().toString()+file.originalname)
// }
var _default = (0, _multer.default)({
  storage: _multer.default.diskStorage({}),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});
exports.default = _default;