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

//update food item
const updateFood = async (req, res) => {
    try {
      const { id, name, description, price, category } = req.body;

      const updatedData = {
        name,
        description,
        price,
        category
      };


      // check if a new image is get
      if (req.file) {
        const food = await foodModel.findById(id);
  
        // remove the old image from cloudinary
        if (food.imagePublicId) {
          await cloudinary.uploader.destroy(food.imagePublicId);
        }
  
        updatedData.image = req.file.path;
        updatedData.imagePublicId = req.file.filename;
      }
  
      const updatedFood = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });
      
      res.status(200).json({ success: true, message: "Food updated", data: updatedFood });
    } catch (error) {
      console.error("Error updating food:", error);
      res.status(500).json({ success: false, message: "Error while updating food" });
    }
  };
  

export { addFood, listFood, removeFood, updateFood };
