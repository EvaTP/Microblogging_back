const express = require("express");
const app = express();
const postsRouter =require('./routes/posts')
const cors = require('cors');


app.get("/", (req, res) => {
  res.send("Hello Microblog!");
});
app.use(express.json())


//const postsRouter =require('./routes/posts')
app.use("/posts", postsRouter)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


