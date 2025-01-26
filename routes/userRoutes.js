const express = require("express");
const router = express.Router();
const {
  addUser,
  claimPoints,
  getLeaderboard,
  getHistory,
} = require("../controllers/userController");

// Add a new user
router.post("/add", addUser);

// Claim random points for a user
router.post("/:id/claim", claimPoints);

// Fetch leaderboard
router.get("/leaderboard", getLeaderboard);

// Fetch claim points history
router.get("/history", getHistory);

module.exports = router;
