import React, { useState } from "react";
import { auth } from "./firebase_config";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signinbody.css";

export const Signinbody = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const handleSignIn = () => {
    // Perform any necessary sign-in logic here

    // Redirect to another page
    navigate("/Home"); // Change "/dashboard" to the desired path
  };
  return (
    <div>
      <section>
        <div className="container">
          <div className="image-container">
            <img src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/bench-accounting-C3V88BOoRoM-unsplash.jpg?v=1709198140153" />
            <div className="white-box">
              <p className="text_1">SIGN IN</p>
              <div className="form-container">
                <input
                  type="text"
                  className="text_2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-container">
                <input
                  type="password"
                  className="text_2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button className="button" onClick={handleSignIn}>
                  {" "}
                  SIGN IN{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
