import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodControllers.js"
import multer from "multer";
import storage from "../config/cloudinaryStorage.js";

//  //image storage engine
// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         return cb(null, `${Date.now()}${file.originalname}`)
//     }
// })

const upload = multer({ storage });

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

export default foodRouter;