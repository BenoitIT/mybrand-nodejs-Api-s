"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploads = void 0;
var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
//configuring environment variable at cloudinary
_cloudinary.default.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
//generating upload function to cloudinary
const uploads = (file, folder) => {
  return new Promise(resolve => {
    _cloudinary.default.uploader.upload(file, result => {
      resolve({
        url: result.url,
        id: result.public_id
      }), {
        resource: "auto",
        folder: folder
      };
    });
  });
};
exports.uploads = uploads;