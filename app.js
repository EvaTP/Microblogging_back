const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

const statusRoutes = require("./routes/status");
app.use("/status", statusRoutes);

const commentRoutes = require("./routes/comments");
app.use("/comments", commentRoutes);

const likesRoutes = require("./routes/likes");
app.use("/likes", likesRoutes);

app.get("/", (req, res) => {
  res.send("Hello Microblog!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
