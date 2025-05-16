import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState(''); // For success and error messages
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password });
            // console.log(res)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setPopupMessage('Login successful! Redirecting...');
            setShowPopup(true);

            // Navigate to dashboard after delay
            setTimeout(() => {
                setShowPopup(false);
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.log(err)
            const errorMessage = err.response?.data?.msg || 'Login failed';
            setPopupMessage(errorMessage);
            setShowPopup(true);
        }
    };

    const handleOkClick = () => {
        setShowPopup(false); // Close the popup on OK click
    };

    return (
        <div id='dummcontainer'>
            <div
                id='signin-header'
                onClick={() => navigate('/signup')}
            >
                SIGN IN
            </div>

            <div id='loginBox'>
                <div id='wave'>
                    <img src="https://t3.ftcdn.net/jpg/05/40/08/38/360_F_540083851_WPHVKF00Oxmdtsg0JYLh1ouTTjKKfiaJ.jpg" alt="" />
                </div>
                <div className='login-avatar'>
                    <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt='User Avatar' />
                </div>
                <div className="inputs-container">
                    <div className="input-container">
                        <FaUser className="input-icon" style={{ color: '#96A1BD' }} />
                        <div className="divider"></div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="username-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <FaLock className="input-icon" style={{ color: '#96A1BD' }} />
                        <div className="divider"></div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div id='login-footer'>
                    <label className="remember-me">
                        <input type="checkbox" />
                        <span className="custom-checkbox"></span>
                        Remember me
                    </label>
                    <a href='#' className='forgot-password'>Forget your password?</a>
                </div>
                <button id='login-button' onClick={handleLogin}>LOGIN</button>
            </div>

            {/* Popup Component */}
            {showPopup && (
                <>
                    <div className="popup-backdrop" />
                    <div className="popup">
                        <p>{popupMessage}</p>
                        <button onClick={handleOkClick} className="popup-ok-button">OK</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
