const PORT = process.env.PORT || 3001
import express from "express"
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello from anonymouschirp server")
})

app.listen(PORT,()=>{
    console.log("server started on port", PORT);
})