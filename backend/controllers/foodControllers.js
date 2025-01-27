import foodModel from "../models/foodModel.js";
import fs from "fs"; // Importing filesystem - prebuilt in Node.js

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.status(201).json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error adding food:", error);

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export { addFood, listFood };
