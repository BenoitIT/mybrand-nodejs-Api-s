import Blog from "../models/blogs";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { uploads } from "../cloudinary/cloudinary";

export const createBlog = async (req, res) => {
  try {
    const uploader = async (path) => await uploads(path, "blogImg");
    const actualPath = req.file.path;
    //initializing cloudinary path
    const newPath = await uploader(actualPath);
    const newBlog = await Blog.create({
      title: req.body.title,
      category: req.body.category,
      blogImage: newPath.url,
      blogDescription: req.body.blogDescription,
    });
    res.status(201).json({ message: "post blogs sent" ,
                            data:newBlog});
  } catch (ex) {
    return res.status(400).json({
      message: "the blog contents already exist",
    });
  }
};
//display all blogs
export const listBlogs = asyncWrapper(async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json({
   status:'success',
   data:blogs})
});
//find single blog
export const findSingleBlog =async (req, res) => {
  try{
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id })
    .populate("comments", "comment")
    .exec();
  if(!blog)return res.status(404).json({message:'message not found'});
  res.success({ data: blog });
} catch (ex) {
  return res.status(400).json({
    message: "the blog is not exist",
  })
}
};
//delete a single blog
export const deleteBlog = async (req, res) => {
  try{
  const  _id  = req.params.id;
  const blog= await Blog.findOne({_id}).exec();
  if(!blog){return res.status(404).json({message:'message not found'});
  }
  blog.remove();
  res.status(204).json({message: 'blog has been deleted'});
} catch (ex) {
  return res.status(400).json({
    message: "the blog is not exist",
  })
}
};
//update  single blog
export const updateBlog = asyncWrapper(async (req, res) => {
  const uploaderFn = async (imgPath) => await uploads(imgPath, "blogImage");
  const actualPath = req.file.path;
  const newPath = await uploaderFn(actualPath);
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id }).exec();
  (blog.title = req.body.title),
    (blog.category = req.body.category),
    (blog.blogImage = newPath.url),
    (blog.blogDescription = req.body.blogDescription),
    blog.save();
  const message = "updated success";
  res.success({ data: blog, message });
});
