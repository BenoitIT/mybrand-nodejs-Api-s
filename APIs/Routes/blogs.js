const express = require("express");
//const {auth}= require('../middlewares/auth')
const { upload } = require("../cloudinary/multer");
const Router = express.Router();
const {
  createBlog,
  listBlogs,
  findSingleBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");
//blog routes
Router.post("/blogs",upload.single('blogImage'),createBlog);
Router.get("/blogs", listBlogs);
Router.get("/blog/:id", findSingleBlog);
Router.delete("/blog/:id",deleteBlog);
Router.patch("/blog/:id", updateBlog);
module.exports = Router;
