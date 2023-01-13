const mongoose = require("mongoose");
require("mongoose-type-url");
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
module.exports = mongoose.model("Blog", blogsSchema);
