import mongoose from "mongoose";
import "mongoose-type-url";
const blogsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 255,
  },
  category: {
    type: String,
    required: true,
  },
  blogImage: {
    type:mongoose.SchemaTypes.Url,
    required: true,
  },
  blogDescription: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Blog", blogsSchema);
