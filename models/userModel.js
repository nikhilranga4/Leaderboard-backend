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
    default: false,
  },
}, { timestamps: true });

// Prevent overwriting the model
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
