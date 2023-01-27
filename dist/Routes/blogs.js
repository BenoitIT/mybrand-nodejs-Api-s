"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlogRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("../cloudinary/multer"));
var _auth = require("../middlewares/auth");
var _comments = require("../controllers/comments");
var _blogs = require("../controllers/blogs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BlogRouter = _express.default.Router();
exports.BlogRouter = BlogRouter;
//blog routes
BlogRouter.post("/Api/blogs/new", _auth.auth, _multer.default.single("blogImage"), _blogs.createBlog);
BlogRouter.get("/Api/blogs/all", _blogs.listBlogs);
BlogRouter.get("/Api/blogs/blog/:id", _blogs.findSingleBlog);
BlogRouter.delete("/Api/blog/:id", _auth.auth, _blogs.deleteBlog);
BlogRouter.patch("/Api/blog/:id", _auth.auth, _multer.default.single("blogImage"), _blogs.updateBlog);
//comments
BlogRouter.post("/Api/blog/:id/addcomment", _auth.auth, _comments.addComment);
BlogRouter.delete("/Api/blog/comments/delete/:commentId", _auth.auth, _comments.deleteComment);
BlogRouter.patch("/Api/blog/comments/update/:commentId", _auth.auth, _comments.editComment);