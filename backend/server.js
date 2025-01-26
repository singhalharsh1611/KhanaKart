import express from "express"
import cors from "cors"

// app congif
const app=express();
const port=4000;

// app middleware
app.use(express.json())
app.use(cors());


app.get("/",(req,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`server started on port :${port}`)
})