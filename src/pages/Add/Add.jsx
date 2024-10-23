import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Add = ({ url }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Dog",
    quantity: 1 // Default quantity set to 1
  });
  

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("quantity", Number(data.quantity)); // Adding quantity to formData
    formData.append("image", image);
  
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Dog",
          quantity: 1
        });
        setImage(false);
        toast.success(response.data.message);
        navigate('/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add food item.');
      console.error('Error adding food item:', error);
    }
  }
  
  

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
        </div>
        <div className="add-category-price">
  <div className="add-category flex-col">
    <p>Product Category</p>
    <select onChange={onChangeHandler} name="category">
      <option value="Dog">Dog</option>
      <option value="Cat">Cat</option>
    </select>
  </div>
  <div className="add-price flex-col">
    <p>Product Price</p>
    <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='1000' />
  </div>
  <div className="add-quantity flex-col">
    <p>Product Quantity</p>
    <input onChange={onChangeHandler} value={data.quantity} type="number" name='quantity' placeholder='1' min="1" />
  </div>


        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
}

export default Add;