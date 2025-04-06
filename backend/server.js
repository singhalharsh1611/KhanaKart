import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js"
import cartRouter from "./routes/cartRoute.js";
import session from "express-session";
import passport from "passport";
import passportSetup from "./config/passport.js";
import orderRouter from "./routes/orderRoute.js";



    // app config
    const app = express();
    const port = process.env.PORT || 4000;

    // app middleware
    app.use(express.json())
    app.use(cors({
        origin: ['http://localhost:5173', 'http://localhost:5174'],
        credentials: true
    }));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/auth', userRouter);


    //initialize passport
    passportSetup();

    // database connect
    connectDB();

//api endpoint
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"))
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

    app.get("/", (req, res) => {
        res.send("API WORKING");
    })

    app.listen(port, () => {
        console.log(`server started on port :${port}`)
    })