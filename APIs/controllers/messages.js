import Messages from "../models/messages";
import { asyncWrapper } from "../middlewares/asyncWrapper";
export const getAll = async (req, res) => {
  const message = await Messages.find({});
  res.json({ message });
};
export const createMessage = asyncWrapper(async (req, res) => {
  const message = await Messages.create({
    senderName: req.body.senderName,
    senderEmail: req.body.senderEmail,
    subject: req.body.subject,
    message: req.body.message,
  });
  res.status(201).json({message:"message sent"});
});
export const readOne = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const message = await Messages.findOne({ _id:id }).exec();
  if (message) {
    res.json({ message });
  }
  return res.status(402).json({ message: `no id found` });
});
export const deleteMes = asyncWrapper(async (req, res) => {
  const { _id } = req.params;
  await Messages.findByIdAndDelete({ _id });
  res.json({message:"message is removed"});
});



