import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './Orders.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const url = 'http://localhost:4000';  

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }

  }
  useEffect(() => {
    fetchAllOrders();
  }, []);  

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcelIcon} alt=""/>
            <div>
              <p className='order-item-food'>
                 {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return  (
                      <span key={idx}>
                        {item.name + " x " + item.quantity}
                      </span>
                    );
                  } else {
                    return   (
                      <span key={idx}>
                        {item.name + " x " + item.quantity}
                        <br />
                      </span>
                    );             
                  }                 
                 })}
              </p>
              <p className = "order-item-name">{order.address.firstname+" "+order.address.lastname} </p>
              <div className = "order-item-address">
                <p>{order.address.street+","}</p>
              <p>{order.address.city+","+order.address.state+","+order.address.country}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>Rs. {order.amount}.00</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
          </div> 
        ))}
      </div>
    </div>
  );
};

export default Orders;