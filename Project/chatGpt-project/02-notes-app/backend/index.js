const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const notesRoutes = require("./routes/notes");
app.use("/", notesRoutes);
app.use("/notes", notesRoutes);

// Mongo DB connection
const MONGO_URI =
  "mongodb+srv://gwine:elmagnifico@cluster0.pgudh.mongodb.net/notes-app?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
