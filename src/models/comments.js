import mongoose from 'mongoose';
const commentSchema=mongoose.Schema({
blog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Blog'},
user:{
    type:String,
},
comment:{
    type:String,
    required:true
},
commentingDate:{
 type: Date,
 default: Date.now
}
});
export default mongoose.model('Comment', commentSchema);