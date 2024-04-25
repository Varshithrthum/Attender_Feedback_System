import React, { useState } from "react";
import { auth } from "./firebase_config";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import "./Navbarbefore.css";

const Navbarafter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log("Signout Successful!");
    window.location.replace("/");
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navdiv">
          <div className="logo-nav">
            <a className="navbar-brand">
              <img
                src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/Oxford-Brookes-blue.jpg?v=1709197319114"
                alt=""
                width="140"
                height="110"
              />
              <span className="logo">Attender Feedback System</span>
            </a>
          </div>

          <input type="checkbox" id="check" />
          <div className={`side-bar ${sidebarOpen ? 'open' : ''}`} id="side-bar">
            <ul className="nav_1">
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
              <Link to="/Questionaire" className="nav-link">Select Questionaire</Link>
            </li>
            <li className="nav-item">
              <Link to="/Report" className="nav-link">Reports</Link>
            </li>
            <li className="nav-item">
              <Link to="/Chart" className="nav-link">Charts</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link" onClick={() => handleLogout()}>Log Out</Link>
            </li>
            </ul>
          </div>

          <label htmlFor="check" className="barras" onClick={toggleSidebar}>
            <FaBars />
          </label>

          <ul className={`nav ${sidebarOpen ? 'hidden' : ''}`}>
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/addquest" className="nav-link">Add questions</Link>
            </li>
            <li className="nav-item">
              <Link to="/Questionaire" className="nav-link">Select Questionaire</Link>
            </li>
            <li className="nav-item">
              <Link to="/Report" className="nav-link">Reports</Link>
            </li>
            <li className="nav-item">
              <Link to="/Chart" className="nav-link">Charts</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link" onClick={() => handleLogout()}>Log Out</Link>
            </li>


          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbarafter;
