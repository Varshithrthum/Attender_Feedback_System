import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import "./Navbarbefore.css";

export const Navbarbefore = () => {
  return (
<div>
      <nav className="navbar">
        <div className="navdiv">
        <div class= "logo-nav">
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
          <input type="checkbox" id="check"/>
           <div className="side-bar" id="side-bar">
           <ul className="nav_1">
            <li className="nav-item1">
              <Link to="/" className="nav-link1">
                Sign In
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/Signup" className="nav-link1">
                Sign Up
              </Link>
            </li>
          </ul>
          </div>
          <label for="check" class="barras">
              <FaBars />
          </label>

          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Signup" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

