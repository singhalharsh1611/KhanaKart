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


//all food list
const listFood = async(req, res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
    } catch (error) {
        console.log(erorr);
        res.json({success:false, message:"Error while fetching food list"})
    }
};

export { addFood, listFood };
