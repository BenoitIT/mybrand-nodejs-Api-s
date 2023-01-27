"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editComment = exports.deleteComment = exports.addComment = void 0;
var _comments = _interopRequireDefault(require("../models/comments"));
var _asyncWrapper = require("../middlewares/asyncWrapper");
var _blogs = _interopRequireDefault(require("../models/blogs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// define post comment function
const addComment = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const blogId = req.params.id;
  const userId = req.authuser._id;
  const {
    comment
  } = req.body;
  const newComment = await _comments.default.create({
    blog: blogId,
    user: userId,
    comment
  });
  await _blogs.default.updateOne({
    _id: blogId
  }, {
    $push: {
      comments: newComment._id
    }
  });
  const message = "comment created";
  res.success({
    message,
    data: newComment
  });
});
//delete comment
exports.addComment = addComment;
const deleteComment = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const {
    commentId
  } = req.params;
  const activeComment = await _comments.default.findOne({
    _id: commentId
  }).exec();
  const commentor = activeComment.user.toString();
  if (req.authuser._id === commentor) {
    await _comments.default.findByIdAndRemove({
      _id: commentId
    });
    const message = "comment deleted";
    res.success({
      message
    });
  } else {
    res.fail();
  }
});
//edit comment
exports.deleteComment = deleteComment;
const editComment = (0, _asyncWrapper.asyncWrapper)(async (req, res) => {
  const {
    commentId
  } = req.params;
  const activeComment = await _comments.default.findOne({
    _id: commentId
  }).exec();
  const commentor = activeComment.user.toString();
  // edit post inoccrodance to poster
  if (req.authuser._id === commentor) {
    activeComment.comment = req.body.comment;
    activeComment.save();
    const message = "success";
    res.success({
      message
    });
  } else {
    res.fail();
  }
});
exports.editComment = editComment;