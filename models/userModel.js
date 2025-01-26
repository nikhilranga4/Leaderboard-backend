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
    default: false, // Default to active
  },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
