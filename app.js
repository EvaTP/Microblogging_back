const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

const statusRoutes = require("./routes/status");
app.use("/routes/status", statusRoutes);

app.get("/routes/status/test2", (req, res) => {
  res.send("test direct depuis app.js");
});

app.get("/", (req, res) => {
  res.send("Hello Microblog!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
