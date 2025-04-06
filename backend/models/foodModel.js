import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    imagePublicId: { type: String }, // it will help to remove the image when food is removed
    category: {
        type: String,
        required: true
    }
});

//if model already present then use existing model, else create a new model
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;