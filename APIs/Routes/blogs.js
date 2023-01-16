import express from "express";
import { upload } from "../cloudinary/multer";
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
BlogRouter.post("/blogs", auth, upload.single("blogImage"), createBlog);
BlogRouter.get("/blogs", listBlogs);
BlogRouter.get("/blog/:id", findSingleBlog);
BlogRouter.delete("/blog/:id", auth, deleteBlog);
BlogRouter.patch("/blog/:id", auth, updateBlog);
//comments
BlogRouter.post("/blog/:id/addcomment", auth, addComment);
BlogRouter.delete("/blog/comments/delete/:commentId", auth, deleteComment);
BlogRouter.patch("/blog/comments/update/:commentId", auth, editComment);
