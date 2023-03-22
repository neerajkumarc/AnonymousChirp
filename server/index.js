const PORT = process.env.PORT || 3001;
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const postModel = require("./models/postModel");
// const {
//   uniqueNamesGenerator,
//   animals,
//   names,
// } = require("unique-names-generator");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("database connected...");
  app.listen(PORT, () => {
    console.log("server started on port", PORT);
  });
});

// app.use(express.json());

app.get("/", async (req, res) => {
  const allPost = await postModel.find({});
  try {
    res.status(200).json(allPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// app.post("/", async (req, res) => {
//   const post = req.body.post;
//   const name = uniqueNamesGenerator({ dictionaries: [names, animals] });
//   try {
//    if(post){
//     const data = await postModel.create({ name, post });
//     res.json(data);
//    }
//    res.status(400).json({"msg":"post is required"})
//   } catch (error) {
//     res.send(error);
//   }
// });

// const PORT = process.env.PORT || 3001;
// const express = require("express");
// const app = express();
// app.get("/",(req,res)=>{
// res.end("hello")
// }
// )
// app.listen(PORT, () => {
//   console.log("server started on port", PORT);
// });
