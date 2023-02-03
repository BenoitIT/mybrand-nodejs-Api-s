import Comment from "../models/comments";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import Blog from "../models/blogs";
// define post comment function
export const addComment = asyncWrapper(async (req, res) => {
  const blogId = req.params.id;
  if(!blogId)return res.status(404).json({message:'no blog found'});
  const userId = req.authuser.username;
  const { comment } = req.body;
  if(!comment)return res.status(204).json({message:'comment is empty'});
  const newComment = await Comment.create({
    blog: blogId,
    user: userId,
    comment,
  });
  await Blog.updateOne({_id:blogId},
    {
     $push:{comments:newComment._id}
    })
  res.status(201).json({
    message:'comment added',
    data:newComment
  });
});
//delete comment
export const deleteComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  if(!commentId )return res.status(404).json({message:'no comment found'});
  const activeComment = await Comment.findOne({ _id: commentId }).exec();
  console.log(activeComment);
  const commentor = activeComment.user;
  // if (req.authuser.username === commentor) {
    await Comment.findByIdAndRemove({ _id: commentId });
    res.status(200).json({message:'comment has beeb deleted'});;
  // } else {
  //   res.status(403).json({message:"can't delete this comment"});
  //       }
});
//edit comment
export const editComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const activeComment = await Comment.findOne({ _id: commentId }).exec();
  const commentor = activeComment.user;
  // edit post inoccrodance to poster
  if (req.authuser.username === commentor) {
    activeComment.comment = req.body.comment;
    activeComment.save();
    const message="success";
    res.success({
      message,
    });
  } else {
      res.status(403).json({message:"can't update this comment"});
  }
});
