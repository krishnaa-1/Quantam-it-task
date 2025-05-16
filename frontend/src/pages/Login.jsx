import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent page reload on form submit

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setPopupMessage('Login successful! Redirecting...');
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.msg || 'Login failed';
            setPopupMessage(errorMessage);
            setShowPopup(true);
        }
    };

    const handleOkClick = () => {
        setShowPopup(false);
    };

    return (
        <div id='dummcontainer'>
            <div
                id='signin-header'
                onClick={() => navigate('/signup')}
            >
                SIGN IN
            </div>

            <form id='loginBox' onSubmit={handleLogin}>
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
                            required
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
                            required
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
                <button id='login-button' type='submit'>LOGIN</button>
            </form>

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
