import React, { useState, useEffect } from "react";
import "./Update.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Update = ({ food, onClose, url, fetchList }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        id: food._id,
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("category", data.category);
            if (image) {
                formData.append("image", image);
            }

            const response = await axios.post(`${url}/api/food/update`, formData);
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
                onClose();
            } else {
                toast.error("Update failed");
            }
        } catch (err) {
            toast.error("Error updating item");
        }
    };

    return (
        <div className="popup-backdrop">
            <div className="popup-container">
                <button className="popup-close" onClick={onClose}>✕</button>
                <form className="flex-col" onSubmit={onSubmitHandler}>
                    <h2>Edit Food Item</h2>

                    <div className="add-img-upload flex-col">
                        <p>Change Image</p>
                        <label htmlFor="update-image">
                            <img
                                className="food-img"
                                src={image ? URL.createObjectURL(image) : food.image}
                                alt="food"
                            />
                        </label>
                        <input
                            type="file"
                            id="update-image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            hidden
                        />
                    </div>

                    <div className="flex-col">
                        <p>Product Name</p>
                        <input type="text" name="name" value={data.name} onChange={onChangeHandler} />
                    </div>

                    <div className="flex-col">
                        <p>Description</p>
                        <textarea name="description" rows="4" value={data.description} onChange={onChangeHandler}></textarea>
                    </div>

                    <div className="flex-col">
                        <p>Category</p>
                        <select name="category" value={data.category} onChange={onChangeHandler}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="South Indian">South Indian</option>
                        </select>
                    </div>

                    <div className="flex-col">
                        <p>Price (Rs.)</p>
                        <input type="number" name="price" value={data.price} onChange={onChangeHandler} />
                    </div>

                    <button type="submit" className="add-btn">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
