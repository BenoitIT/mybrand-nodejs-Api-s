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
  res.success({ data: blogs  })
});
//find single blog
export const findSingleBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id }).populate("comments","comment").exec();
   res.success({ data: blog })
});
//delete a single blog
export const deleteBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const message='blog is deleted"'
  await Blog.findByIdAndDelete({ _id: id });
  res.success({ message })
});
//update  single blog
export const updateBlog = asyncWrapper(async (req, res) => {
  const uploaderFn=async(imgPath)=>await uploads(imgPath,'blogImage');
  const actualPath=req.file.path;
  const newPath= await uploaderFn(actualPath);
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id }).exec();
  blog.title= req.body.title,
  blog.category= req.body.category,
  blog.blogImage=newPath.url,
  blog.blogDescription= req.body.blogDescription,
  blog.save();
  const message='updated success'
  res.success({ data:blog ,message })
});

