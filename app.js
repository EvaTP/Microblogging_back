const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const statusRoutes = require("./routes/status");
const commentRoutes = require("./routes/comments");
const likesRoutes = require("./routes/likes");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const registerRoute = require("./routes/register");

app.use("/status", statusRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likesRoutes);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/register", registerRoute);

app.get("/", (req, res) => {
  res.send("Hello Microblog!");
});

//const postsRouter =require('./routes/posts')
app.use("/posts", postsRouter);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
