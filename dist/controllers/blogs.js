"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.listBlogs = exports.findSingleBlog = exports.deleteBlog = exports.createBlog = void 0;
var _blogs = _interopRequireDefault(require("../models/blogs"));
var _asyncWrapper = require("../middlewares/asyncWrapper");
var _cloudinary = require("../cloudinary/cloudinary");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createBlog = async (req, res) => {
  try {
    const uploader = async path => await (0, _cloudinary.uploads)(path, "blogImg");
    const actualPath = req.file.path;
    //initializing cloudinary path
    const newPath = await uploader(actualPath);
    const newBlog = await _blogs.default.create({
      title: req.body.title,
      category: req.body.category,
      blogImage: newPath.url,
      blogDescription: req.body.blogDescription
    });
    res.status(201).json({
      message: "post blogs sent"
    });
  } catch (ex) {
    return res.status(400).json({
      message: "the blog contents already exist"
    });
  }
};
//display all blogs
exports.createBlog = createBlog;
const listBlogs = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const blogs = await _blogs.default.find({});
  res.success({
    data: blogs
  });
});
//find single blog
exports.listBlogs = listBlogs;
const findSingleBlog = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const blog = await _blogs.default.findOne({
      _id: id
    }).populate("comments", "comment").exec();
    res.success({
      data: blog
    });
  } catch (ex) {
    return res.status(400).json({
      message: "the blog is not exist"
    });
  }
};
//delete a single blog
exports.findSingleBlog = findSingleBlog;
const deleteBlog = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const message = 'blog is deleted"';
    await _blogs.default.findByIdAndDelete({
      _id: id
    });
    res.success({
      message
    });
  } catch (ex) {
    return res.status(400).json({
      message: "the blog is not exist"
    });
  }
};
//update  single blog
exports.deleteBlog = deleteBlog;
const updateBlog = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const uploaderFn = async imgPath => await (0, _cloudinary.uploads)(imgPath, "blogImage");
  const actualPath = req.file.path;
  const newPath = await uploaderFn(actualPath);
  const {
    id
  } = req.params;
  const blog = await _blogs.default.findOne({
    _id: id
  }).exec();
  blog.title = req.body.title, blog.category = req.body.category, blog.blogImage = newPath.url, blog.blogDescription = req.body.blogDescription, blog.save();
  const message = "updated success";
  res.success({
    data: blog,
    message
  });
});
exports.updateBlog = updateBlog;