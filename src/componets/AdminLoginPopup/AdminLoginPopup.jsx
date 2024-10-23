import React, { useState } from 'react';
import './AdminLoginPopup.css';
import axios from 'axios';

const AdminLoginPopup = ({ setShowAdminLogin, onAdminLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const baseURL = 'http://localhost:4000/api/admin';
            const response = await axios.post(`${baseURL}/login`, { username, password });

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('adminToken', token);  // Store the token
                onAdminLogin();  // Call the callback after login
                setShowAdminLogin(false);   // Close the login popup
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error('Error:', err);
        }
    };

    return (
        <div className='admin-login-popup'>
            <form className="admin-login-popup-container" onSubmit={handleSubmit}>
                <div className="admin-login-popup-title">
                    <h2>Admin Login</h2>
                </div>
                <div className="admin-login-popup-inputs">
                    <input
                        type="text"
                        placeholder="Admin Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="admin-login-button">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginPopup;
