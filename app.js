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

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users"); // 🔹 Router des users

app.use(express.json()); // Obligatoire pour que req.body fonctionne !

app.use("/users", usersRouter); // Tous les appels à /users vont dans routes/users.js

app.get("/", (req, res) => {
  res.send("Hello Microblog!");
});
app.use(express.json());

//const postsRouter =require('./routes/posts')
app.use("/posts", postsRouter);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
