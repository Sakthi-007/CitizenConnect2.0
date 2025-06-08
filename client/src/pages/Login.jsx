import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CSS/Login_Signup.css";
function Login({ onLogin }) {
  const [error,setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, formData);
      if (response.status === 200) {
        if (response.data.isAdmin) {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', formData.email);
          localStorage.setItem('department', response.data.dept);

          onLogin(response.data.isAdmin);
          history('/home-Admin');
        } else {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', formData.email);
          onLogin(response.data.isAdmin);
          history('/home');
        }
      } else {
        console.error('Invalid status code:', response.status);
 
      }

    }
     catch (e) {
      console.error(e.response.data.message);
      setError(e.response.data.message)
    }
  };

  return (
    <>
      <div id="head">Citizen Connect</div>
      <div className="container">
        <h2 id='hh'>Login</h2>
        <form className="formm" onSubmit={handleLogin}>
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
          {error && (<span className=" error">{error}</span>)}
          <button className="button" type="submit">
            Login
          </button>
          <p>
            Don't have an account click here to{' '}
            <a style={{ color: 'blue' }} href="/signup">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
