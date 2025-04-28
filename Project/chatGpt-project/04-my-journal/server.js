const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
// const userRoutes = require("./routes/userRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); //Allow frontend to connect to server

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
// app.use("/api/users", userRoutes);

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
