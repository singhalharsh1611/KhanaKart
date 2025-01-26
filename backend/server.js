import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";

// app config
const app = express();
const port = 4000;

// app middleware
app.use(express.json())
app.use(cors());

// database connect
connectDB();

app.get("/", (req, res) => {
    res.send("API WORKING");
})

app.listen(port, () => {
    console.log(`server started on port :${port}`)
})