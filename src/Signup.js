import React, { useState } from "react";
import "./signup.css";
import firebase from "./firebase_config";
import { auth } from "./firebase_config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    id: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: formData.name + " " + formData.surname,})

      console.log("User signed up successfully!");
      navigate("/Home"); // Redirect user to Home.js pages
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle error: Display error message to user
    }
  };

  return (
    <div className="container1">
      <div className="image-container1">
        <img
          src="https://cdn.glitch.global/07931069-62a9-4bd9-a047-47fd7905975d/scott-graham-5fNmWej4tAA-unsplash.jpg?v=1708541537104"
          alt="signup"
        />
        <div className="white-box1">
          <p className="text_1">SIGN UP</p>
          <form onSubmit={handleSubmit} name="form">
            <div className="form-container1">
              <input
                type="text"
                placeholder="Name"
                className="text_21"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="text"
                placeholder="Family name"
                className="text_21"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="text"
                placeholder="ID"
                className="text_21"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="email"
                placeholder="Email"
                className="text_21"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-container">
              <input
                type="password"
                placeholder="Password"
                className="text_21"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <input type="submit" value="Sign Up" className="button" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
