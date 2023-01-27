import express from "express";
import upload from "../cloudinary/multer";
import { auth } from "../middlewares/auth";
import {
  addComment,
  deleteComment,
  editComment,
} from "../controllers/comments";
export const BlogRouter = express.Router();
import {
  createBlog,
  listBlogs,
  findSingleBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogs";
//blog routes
BlogRouter.post("/Api/blogs/new", auth, upload.single("blogImage"), createBlog);
BlogRouter.get("/Api/blogs/all", listBlogs);
BlogRouter.get("/Api/blogs/blog/:id", findSingleBlog);
BlogRouter.delete("/Api/blog/:id", auth, deleteBlog);
BlogRouter.patch("/Api/blog/:id", auth, upload.single("blogImage"),updateBlog);
//comments
BlogRouter.post("/Api/blog/:id/addcomment", auth, addComment);
BlogRouter.delete("/Api/blog/comments/delete/:commentId", auth, deleteComment);
BlogRouter.patch("/Api/blog/comments/update/:commentId", auth, editComment);
