import Messages from "../models/messages";
import { asyncWrapper } from "../middlewares/asyncWrapper";
export const getAll = async (req, res) => {
  const message = await Messages.find({});
  res.status(200).json({ message });
};
export const createMessage = asyncWrapper(async (req, res) => {
  const message = await Messages.create({
    senderName: req.body.senderName,
    senderEmail: req.body.senderEmail,
    subject: req.body.subject,
    message: req.body.message,
  });
  res.status(201).json({ message: "message sent" });
});
export const readOne = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const message = await Messages.findOne({ _id: id }).exec();
  if(!message)return res.status(404).json({message:'message not found'});

    res.json({ message });
  
  return res.status(402).json({ message: `no id found` });
});
export const deleteMes = asyncWrapper(async (req, res) => {
  const { _id } = req.params;
  //if (_id.length !== 24)return res.status(400).json({message:'invalid id'});
  const message= await Messages.findOne({_id});
  if(!message)return res.status(404).json({message:'message not found'});
  await Messages.findByIdAndDelete({ _id });
  res.json({ message: "message is removed" });
});
