import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "4eb6e0ffbcbde3b079c5227e9b9676b8";

// 🧠 Database مؤقت
let users = [];

// 🔐 Register
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.json({ success: false, msg: "User exists" });
  }

  users.push({ username, password, fav: [] });
  res.json({ success: true });
});

// 🔓 Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.json({ success: false });

  res.json({ success: true, user });
});

// ⭐ Favorite
app.post("/api/fav", (req, res) => {
  const { username, team } = req.body;

  const user = users.find(u => u.username === username);
  if (user && !user.fav.includes(team)) {
    user.fav.push(team);
  }

  res.json({ success: true });
});

// ⚽ Matches
app.get("/api/matches", async (req, res) => {
  try {
    const r = await fetch("https://api.football-data.org/v4/matches", {
      headers: { "X-Auth-Token": API_KEY }
    });

    const data = await r.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "API ERROR" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER RUNNING SUCCESSFULLY");
});
