import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching data');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Fetch updated list after successful removal
      } else {
        toast.error('Error removing food item');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const updateFood = async (foodId) => {
    try {
      const response = await axios.put(`${url}/api/food/update`, { id: foodId, price: updatedPrice, quantity: updatedQuantity });
      if (response.data.success) {
        toast.success('Food item updated successfully');
        setEditIndex(-1);
        setUpdatedPrice('');
        setUpdatedQuantity('');
        await fetchList(); // Fetch updated list after successful update
      } else {
        toast.error('Error updating food item');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleEditClick = (index, price, quantity) => {
    setEditIndex(index);
    setUpdatedPrice(price);
    setUpdatedQuantity(quantity);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h3>All Foods List</h3>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Actions</b> {/* Updated header */}
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {editIndex === index ? (
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  placeholder="Price"
                />
              ) : (
                `Rs.${item.price}`
              )}
            </p>
            <p>
              {editIndex === index ? (
                <input
                  type="number"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(e.target.value)}
                  placeholder="Quantity"
                />
              ) : (
                item.quantity
              )}
            </p>
            <div className="edit-actions">
              {editIndex === index ? (
                <>
                  <button onClick={() => updateFood(item._id)}>Save</button>
                  <button onClick={() => setEditIndex(-1)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(index, item.price, item.quantity)}>Edit</button>
                  <button onClick={() => removeFood(item._id)}>Remove</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
