const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testConnection } = require("./database");
const { initializeDatabase } = require("./initDb");
const schoolRoutes = require("./schoolRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "School Management API is running 🚀",
    version: "1.0.0",
    endpoints: {
      addSchool:   "POST /addSchool",
      listSchools: "GET  /listSchools?latitude=<lat>&longitude=<lon>",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/", schoolRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
  });
});

// ─── Bootstrap ────────────────────────────────────────────────────────────────
const start = async () => {
  await testConnection();
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 School Management API v1.0.0`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}\n`);
  });
};

start().catch((error) => {
  console.error("❌ Failed to start server:", error.message);
  process.exit(1);
});
