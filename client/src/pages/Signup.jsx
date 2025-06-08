import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CSS/Login_Signup.css";

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, formData);
        history('/'); 

      } 
      
    catch (error) {
      console.error(error.response.data.message); 
    }
  };

  
  


  return (
    <>
      <div id="head">Citizen Connect</div>
      <div className="container">
        <h2 id='hh'>Sign Up</h2>
        <form className="formm" onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className='button' >Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
