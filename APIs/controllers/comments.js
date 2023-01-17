import Comment from "../models/comments";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import Blog from "../models/blogs";
// define post comment function
export const addComment = asyncWrapper(async (req, res) => {
  const blogId = req.params.id;
  const userId = req.authuser._id;
  const { comment } = req.body;
  const newComment = await Comment.create({
    blog: blogId,
    user: userId,
    comment,
  });
  await Blog.updateOne({_id:blogId},
    {
     $push:{comments:newComment._id}
    })
    const message="comment created";
  res.success({
    message,
    data: newComment,
  });
});
//delete comment
export const deleteComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const activeComment = await Comment.findOne({ _id: commentId }).exec();
  const commentor = activeComment.user.toString();
  if (req.authuser._id === commentor) {
    await Comment.findByIdAndRemove({ _id: commentId });
    const message="comment deleted";
    res.success({
      message,
    });
  } else {
        res
      .fail()
        }
});
//edit comment
export const editComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const activeComment = await Comment.findOne({ _id: commentId }).exec();
  const commentor = activeComment.user.toString();
  // edit post inoccrodance to poster
  if (req.authuser._id === commentor) {
    activeComment.comment = req.body.comment;
    activeComment.save();
    res.success({
      message,
    });
  } else {
        res
      .fail()
        }
});
