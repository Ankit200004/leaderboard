import { History } from "../models/History.model.js";
import { User } from "../models/User.model.js";

// Get all users (unsorted, for dropdowns)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Get leaderboard (sorted by totalPoints descending)
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required." });
    }

    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user." });
  }
};

// Claim random points (1–10) for a user
export const claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.totalPoints += points;
    await user.save();

    const history = new History({
      userId: user._id,
      pointsClaimed: points,
    });

    await history.save();

    res.json({ user, pointsClaimed: points });
  } catch (err) {
    res.status(500).json({ error: "Failed to claim points." });
  }
};

// Get history of point claims
export const getHistory = async (req, res) => {
  try {
    const history = await History.find()
      .populate("userId", "name") // show user name in history
      .sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
};
