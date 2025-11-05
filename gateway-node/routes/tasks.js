import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";

const router = express.Router();
const JAVA_API = process.env.JAVA_API_URL;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

router.get("/tasks", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${JAVA_API}/tasks`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

export default router;
