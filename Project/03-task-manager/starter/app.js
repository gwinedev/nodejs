const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./DB/connect");
require("dotenv").config();

// middleware
app.use(express.json()); // to send and have json in req.body

// routes
app.use("/api/v1/tasks", tasks);

const port = 3000;

start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server running and listening on port ${port}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
