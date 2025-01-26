const User = require("../models/userModel");
const History = require("../models/historyModel");

// Add a new user
exports.addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const newUser = await User.create({ name });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

// Claim random points for a user
exports.claimPoints = async (req, res) => {
  const { id } = req.params; // Retrieve user ID from URL params
  const { userId } = req.body; // Use the userId from request body

  if (!userId || userId !== id) {
    return res.status(400).json({ error: "User ID mismatch or missing" });
  }

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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
