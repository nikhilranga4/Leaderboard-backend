const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
}, { timestamps: true }); // Add timestamps to track creation/updates

module.exports = mongoose.model("User", userSchema);
