const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  component: { type: String, required: true },
  layout: { type: String, required: true },
  visibility: {
    type: Number,
    enum: [0, 1], 
    default: 1,   
    required: true,
  },
});

module.exports = mongoose.model("menus", MenuSchema);
