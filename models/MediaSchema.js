const Mongoose = require("mongoose");

const MediaSchema = new Mongoose.Schema({
  name: { type: String, require: true },
  url: { type: String, require: true },
  comments: { type: Array, default: [] },
  likes: { type: Number, default: 0 },
  createdBy: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Media = Mongoose.model("media", MediaSchema);
module.exports = Media;
