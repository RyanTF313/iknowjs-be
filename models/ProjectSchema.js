const Mongoose = require("mongoose");

const ProjectSchema = new Mongoose.Schema({
  name: { type: String, require: true },
  url: { type: String, require: true },
  comments: { type: Array, default: [] },
  likes: { type: Number, default: 0 },
  createdBy: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Project = Mongoose.model("project", ProjectSchema);
module.exports = Project;
