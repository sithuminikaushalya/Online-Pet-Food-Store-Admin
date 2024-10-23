import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom'; // Correct spelling of useNavigate


const Navbar = () => {
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/'); // Redirect to homepage
    window.location.reload(); // Optionally reload to reset state
  };
  return (
    <>
      <div className='Navbar'>
        <img src={assets.Logo2} alt='Logo' className='Logo2' />
        <div className='Navbar-title'>Admin Panel</div>
         <button className="logout-button" onClick={handleLogout}>Sign Out</button>

      </div>
    </>
  );
};

export default Navbar;
