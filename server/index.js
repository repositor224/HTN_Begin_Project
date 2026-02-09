const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("users.db");

// CREATE users table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();

// The API endpoint for LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
  const user = stmt.get(username, password);
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// endpoint for user registration
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, error: "Username and password are required" });
  }

  try {
    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run(username, password);
    res.json({ success: true });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      
      res.json({ success: false, error: "User already exists" });
    } else {
      res.json({ success: false, error: "Database error" });
    }
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
