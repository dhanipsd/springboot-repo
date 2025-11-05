import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// Dummy user (later can come from DB)
const user = {
  username: "admin",
  password: bcrypt.hashSync("password", 10),
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
