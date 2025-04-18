// src/components/Login.js
import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Here you would typically make an API call to authenticate
    console.log("Login attempt with:", { email, password });

    // Reset form
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="login-page">
      <hr
        className="login-header-line"
        style={{
          width: "100%",
          height: "0px",
          marginBottom: "0px",
          marginTop: "50px",
          border: "1px solid black",
          color: "black",
          opacity: "1",
        }}
      />

      <div className="header">
        <Link className="logo">
          <img src={assets.logo} alt="logo" />
        </Link>
        <div
          className="logotext"
          style={{ textAlign: "center", alignSelf: "center" }}
        >
          <h2>SHAL PAL</h2>
          <span>Tea House</span>
        </div>

        <Link className="logo">
          <img src={assets.logo} alt="logo" />
        </Link>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      <div className="footer-image">
        <img
          src={assets.photo_login_1}
          alt="footer"
          className="footer-image1"
        />
        <img
          src={assets.photo_login_2}
          alt="footer"
          className="footer-image2"
        />
      </div>
    </div>
  );
};

export default Login;
