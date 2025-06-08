import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/HomeAdmin.css'
function HomeAdmin({ onLogout }) {
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    try {
      await axios.post('https://ccserver-2d2c.onrender.com/api/user/logout');
      setMessage('Logout successful');
      onLogout(); // Notify parent component about logout
    } catch (error) {
      console.error(error.response.data.message); 
    }
  };
  
  return (
    <>
    <div id='head1'>
    <h1>Citizen Connect</h1>
    <button onClick={handleLogout}>Logout</button>
    </div>
    
    <div className="container-1">
        <div className="card">
          <img src="https://t3.ftcdn.net/jpg/01/86/79/64/360_F_186796408_R0YkEqSuSpsxA5SFkSlAAkrGWDuu3IBK.jpg" alt="Complaints Image"/>
          <h2>Complaints</h2>
          <Link to="complaints">View</Link>
        </div>
        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/1027/1027595.png" alt="Solved Image"/>
          <h2>Solved</h2>
          <Link to="solved">View</Link>
        </div>
    </div>


    </> 
 );}

export default HomeAdmin;
