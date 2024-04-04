import React from "react";
import {useState } from "react";
import { auth } from "./firebase_config";
import {getUserData} from "./comps/globalFunctions";

const Navbarafter = () => {
  async function handleLogout() {
    await auth.signOut();
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    console.log("Signout Successful!");
    window.location.replace("/");

  }


  return (
    <div>
      <nav className="navbar">
        <div className="navdiv">
          <a className="navbar-brand">
            <img
              src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/Oxford-Brookes-blue.jpg?v=1709197319114"
              alt=""
              width="140"
              height="110"
            />
            <span className="logo">Attender Feedback System</span>
          </a>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={()=>handleLogout()}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbarafter;
