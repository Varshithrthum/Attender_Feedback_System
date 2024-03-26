import React from "react";

const Navbarafter = () => {
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
              <a className="nav-link">Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbarafter;
