const Blog = require("../models/blogs");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const { uploads } = require("../cloudinary/cloudinary");

const createBlog = asyncWrapper(async (req, res) => {
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
const listBlogs = asyncWrapper(async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json({ data: blogs });
});
//find single blog
const findSingleBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id }).exec();
  res.status(200).json({ data: blog });
});
//delete a single blog
const deleteBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete({ _id: id });
  res.sendStatus(200).json({ message: "blog is deleted" });
});
//update  single blog
const updateBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndUpdate({ _id: id }, req.body);
  res.status(200).json({ data: blog });
});
module.exports = {
  createBlog,
  listBlogs,
  findSingleBlog,
  deleteBlog,
  updateBlog,
};
