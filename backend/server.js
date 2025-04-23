require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const { initDb } = require("./db");

const bookRoutes = require("./routes/books");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Mount routes
app.use("/", bookRoutes);

// Global error handler
app.use((err, req, res, next) => {
  if (err.code === "23505") {
    console.error("Unique constraint violation:", err);
    return res.redirect("/?error=duplicate");
  }

  console.error("Unhandled error:", err);
  res.status(500).send("Internal Server Error");
});

// Start server
const PORT = process.env.PORT || 3000;
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Fatal server startup error:", err);
    process.exit(1);
  });
