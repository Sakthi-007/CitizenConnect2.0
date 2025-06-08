// App.js
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import HomeAdmin from './pages/HomeAdmin.jsx';
import Signup from './pages/Signup.jsx';
import Complaints from './pages/Complaints.jsx';
import Solved from './pages/Solved.jsx';


function App() {

  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (isadmin) => {
    setIsLoggedIn(true);
    localStorage.setItem("isAdmin",isadmin);
  };
  
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  
    useEffect(() => { 
      // const checkLoggedInStatus = () => {
        const userToken = localStorage.getItem('token'); 
        setIsLoggedIn(!!userToken); 
      // };
      // checkLoggedInStatus();
    }, []);
  
  useEffect(() => {
    const storedData = localStorage.getItem('isAdmin');
    setIsAdmin(storedData);
  }, []); 

const router = createBrowserRouter([
  {
    path:"/signup", element:<Signup />
  },
  {
    path:'/',
    element: !isLoggedIn ? <Login onLogin={handleLogin}/> :  (isAdmin=="true" ? <Navigate to={"/home-Admin"}/> : <Navigate to={"/home"} />)
  },
  {
    path: '/home',
    element: isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/" />
  },
  {
    path: '/home-admin',
    element: isLoggedIn ? <HomeAdmin onLogout={handleLogout}/>: <Navigate to="/" />
  },
  {
    path:"home-admin/complaints", element:<Complaints />
  },
  {
    path:"home-admin/solved",element:<Solved />
  }
]);



  return (
    <RouterProvider router={router} />
  // <BrowserRouter>
  //   <Routes>
     //     <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />

    //     <Route path="/home" element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
        //     <Route path="/signup" element={<Signup />} />
        
    //     <Route path="/home-Admin" element={isLoggedIn ? <HomeAdmin onLogout={handleLogout} /> : <Navigate to="/" />} />

        //     {/* admin routes  */}
        //     <Route path="/complaints" element={<Complaints/>} />
        //     <Route path="/solved" element={<Solved/>} />
 //   </Routes>
 // </BrowserRouter>
   );
}

export default App;
