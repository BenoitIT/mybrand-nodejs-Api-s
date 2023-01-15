const express = require("express");
const { upload } = require("../cloudinary/multer");
const {auth}= require('../middlewares/auth')
const Router = express.Router();
const {
  createBlog,
  listBlogs,
  findSingleBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");
//blog routes
Router.post("/blogs",auth,upload.single('blogImage'),createBlog);
Router.get("/blogs", listBlogs);
Router.get("/blog/:id", findSingleBlog);
Router.delete("/blog/:id",auth,deleteBlog);
Router.patch("/blog/:id", auth,updateBlog);
module.exports = Router;
