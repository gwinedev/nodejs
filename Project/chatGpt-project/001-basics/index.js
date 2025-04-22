const express = require("express");
const dotenv = require("dotenv");
const notesRoutes = require("./routes/notes");

dotenv.config(); //Load the dotenv variable
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON body
// Middleware to parse incoming JSON requests (MUST HAVE for POST/PUT requests)
app.use(express.json());

// Routes
app.use("/notes", notesRoutes); // Mount our notes API at the /notes path

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Notes API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
