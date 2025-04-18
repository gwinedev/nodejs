import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

// middle
const app = express();

// to help our server handle json request
app.use(express.json());

// get the (filename)
const __filename = fileURLToPath(import.meta.url);
// get the directory
const __dirname = dirname(__filename);

// serves from the html file from public dir
// also tells it to serve all files as static files
// any request for css will be resolved to the public dir

app.use(express.static(path.join(__dirname, "../public")));

// serving the html file from the
app.get("/", (req, res) => {
  res.status(201).sendFile(path.join(__dirname, "public", "index.htm"));
});

app.use("/auth", authRoutes);
// our todos routes are protected by the authMiddleware function
app.use("/todos", authMiddleware, todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on PORT=${PORT}`));
