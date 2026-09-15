const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  stack: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bullets: {
    type: [String],
    default: [],
  },
  githubLink: {
    type: String,
    default: "",
  },
  liveLink: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    default: 0,
  },
},
{timestamps:true}
);

module.exports = mongoose.model('Project', projectSchema);

// i have only make the models not the controllers