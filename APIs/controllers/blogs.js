import Blog from "../models/blogs";
import { asyncWrapper }from "../middlewares/asyncWrapper";
import {uploads} from "../cloudinary/cloudinary";

export const createBlog = asyncWrapper(async (req, res) => {
  const uploader=async(path)=>await uploads(path,'blogImg')
  const actualPath=req.file.path
  //initializing cloudinary path
  const newPath= await uploader(actualPath)
  const newBlog = await Blog.create({
    title: req.body.title,
    category: req.body.category,
    blogImage: newPath.url,
    blogDescription: req.body.blogDescription,
  });
  res.status(201).json({ message: "post blogs sent" });
});
//display all blogs
export const listBlogs = asyncWrapper(async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json({ data: blogs });
});
//find single blog
export const findSingleBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id }).populate("comments","comment").exec();
  res.status(200).json({ data: blog });
});
//delete a single blog
export const deleteBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete({ _id: id });
  res.sendStatus(200).json({ message: "blog is deleted" });
});
//update  single blog
export const updateBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndUpdate({ _id: id }, req.body);
  res.status(200).json({ data: blog });
});

