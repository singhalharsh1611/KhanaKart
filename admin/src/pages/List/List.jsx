import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPencil } from "@fortawesome/free-solid-svg-icons";
import Update from "../Update/Update";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null); 

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchList();
  }, [list]);

  return (
    <div className="list add flex-col">
      <div className="list-table">
        {list.length === 0 ? (
          <h2>No food items available</h2>
        ) : (
          <>
      <p>All Foods List</p>

            <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <div className="list-table-format-action">
                <p onClick={() => removeFood(item._id)} className="cursor">
                <FontAwesomeIcon icon={faTrash} />
                </p>
                <p onClick={() => setEditItem(item)} className="cursor">
                    <FontAwesomeIcon icon={faPencil} />
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
        {editItem && (
          <Update food={editItem} onClose={() => setEditItem(null)} url={url} fetchList={fetchList} />
        )}
      </div>
    </div>
  );
};

export default List;
