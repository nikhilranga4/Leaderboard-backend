const User = require("../models/userModel");
const History = require("../models/historyModel");

// Add a new user
exports.addUser = async (req, res) => {
  const { name } = req.body;

  try {
    const newUser = await User.create({ name });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

// Claim random points for a user
exports.claimPoints = async (req, res) => {
  const { userId } = req.body;

  try {
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user points
    user.totalPoints += randomPoints;
    await user.save();

    // Save claim history
    const history = await History.create({ userId, points: randomPoints });

    res.status(200).json({ user, history });
  } catch (error) {
    res.status(500).json({ error: "Failed to claim points" });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ totalPoints: -1 })
      .select("name totalPoints");

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

// Get claim history
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find()
      .populate("userId", "name")
      .sort({ timestamp: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the user
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Optionally, delete the user's history entries
    await History.deleteMany({ userId: id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
