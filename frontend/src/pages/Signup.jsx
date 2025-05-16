import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // prevent default form submission reload

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                username: name,
                dob: dateOfBirth,
                email,
                password
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setShowPopup(true);

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div id='dummcontainer'>
            <div
                id='signin-header'
                onClick={() => navigate('/login')}
            >
                LOGIN
            </div>
            <form id='loginBox' onSubmit={handleSignup}>
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
                            placeholder="Name"
                            className="password-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <FaCalendarAlt className="input-icon" style={{ color: '#96A1BD' }} />
                        <div className="divider"></div>
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            className="password-input"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <FaEnvelope className="input-icon" style={{ color: '#96A1BD' }} />
                        <div className="divider"></div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="password-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                <button id='login-button' type='submit'>SIGN UP</button>
            </form>

            {showPopup && (
                <>
                    <div className="popup-backdrop" />
                    <div className="popup">
                        <p>Signup successful! Redirecting...</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Signup;
