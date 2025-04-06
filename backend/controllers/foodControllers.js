import foodModel from "../models/foodModel.js";
import fs from "fs"; // Importing filesystem - prebuilt in Node.js
import cloudinary from "../config/cloudinary.js";

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.path,
        imagePublicId: req.file.filename,
    });

    try {
        await food.save();
        res.status(201).json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error adding food:", error);

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.log(erorr);
        res.status(500).json({ success: false, message: "Error while fetching food list" })
    }
};


//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (food.imagePublicId) {
            await cloudinary.uploader.destroy(food.imagePublicId);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error while deleting food" })
    }
}

export { addFood, listFood, removeFood };
