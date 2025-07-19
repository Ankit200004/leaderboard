import express from "express";
import {
  getUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getHistory,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers); // Get all users
router.get("/leaderboard", getLeaderboard); // Sorted by total points
router.get("/history", getHistory); // Get point claim history

router.post("/", addUser); // Add user
router.post("/claim/:userId", claimPoints); // Claim points for a user

export default router;
