import express from "express";
import { upload } from "../cloudinary/multer";
import  {auth} from '../middlewares/auth'
export const BlogRouter = express.Router();
import {
  createBlog,
  listBlogs,
  findSingleBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogs";
//blog routes
BlogRouter.post("/blogs", auth,upload.single("blogImage"), createBlog);
BlogRouter.get("/blogs", listBlogs);
BlogRouter.get("/blog/:id", findSingleBlog);
BlogRouter.delete("/blog/:id",auth, deleteBlog);
BlogRouter.patch("/blog/:id", auth,updateBlog);
