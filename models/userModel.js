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
  isDeleted: {
    type: Boolean,
    default: false, // Track if the user is deleted
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
