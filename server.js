import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ مؤقت (للتجربة فقط)
let users = [];

// REGISTER
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, msg: "Missing data" });
  }

  const exists = users.find(u => u.username === username);

  if (exists) {
    return res.json({ success: false, msg: "User exists" });
  }

  users.push({ username, password });
  res.json({ success: true });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.json({ success: false });
  }

  res.json({ success: true, user });
});

// TEST
app.get("/", (req, res) => {
  res.send("API WORKING");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
