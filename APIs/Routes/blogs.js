import express from "express";
import { upload } from "../cloudinary/multer";
//const {auth}= require('../middlewares/auth')
export const BlogRouter = express.Router();
import {
  createBlog,
  listBlogs,
  findSingleBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogs";
//blog routes
BlogRouter.post("/blogs", upload.single("blogImage"), createBlog);
BlogRouter.get("/blogs", listBlogs);
BlogRouter.get("/blog/:id", findSingleBlog);
BlogRouter.delete("/blog/:id", deleteBlog);
BlogRouter.patch("/blog/:id", updateBlog);
