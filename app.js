const express = require("express");
const app = express();
const usersRouter = require("./routes/users"); // 🔹 Router des users

app.use(express.json()); // Obligatoire pour que req.body fonctionne !


app.use("/users", usersRouter); // Tous les appels à /users vont dans routes/users.js




app.get("/", (req, res) => {
  res.send("Hello Microblog!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
