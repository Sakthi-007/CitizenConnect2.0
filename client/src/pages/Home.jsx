import { useState } from "react";
import axios from "axios";
import "./CSS/Home.css";
import ComplainForm from "../components/ComplaintForm";
import ComplainList from "../components/ComplaintList";
import { TiThMenu } from "react-icons/ti";


function Home({ onLogout }) {
  const [formOpen, setformOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [message, setMessage] = useState("");
  const handleLogout = async () => {
    try {
      localStorage.removeItem("email");
      await axios.post("https://ccserver-2d2c.onrender.com/api/user/logout");
      setMessage("Logout successful");
      onLogout();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const handleSideBar = (formState) => {
    setformOpen(formState);
    setOpenSidebar(false);
  };
  return (
    <>
     <div className="head-wrapper">
      <div id="head1">
        <h1>Citizen Connect</h1>
        {/* navbar */}
        <div className="navbar">
          <ul >
                <li onClick={() => handleSideBar(true)}>ComplainForm</li>
                <li onClick={() => handleSideBar(false)}>history</li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
          </ul>
        </div>


        {/* mobile sidebar */}
        <TiThMenu className="side_menu" onClick={() => setOpenSidebar(true) } />
        {/* {openSidebar && ( */}
          <div className="sidebar" style={ openSidebar ? {"display":"block"} :{ "display":"none"}}>
            <ul >
              <TiThMenu className="menu-icon" onClick={() => setOpenSidebar(false)} />
              <li onClick={() => handleSideBar(true)}>ComplainForm</li>
              <li onClick={() => handleSideBar(false)}>history</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        {/* )} */}
      </div>
      </div>
      <div className={formOpen ? "container home-container form-container" : " container home-container"} >
        {formOpen ? <ComplainForm /> : <ComplainList />}
      </div>
    </>
  );
}

export default Home;
