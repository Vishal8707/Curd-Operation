import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleEmailchange = (e) => {
    setEmailId(e.target.value);
  };
  const handlePasswordchange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call your API endpoint to handle login with email and password
    const userData = {
      emailId,
      password,
    };


    try {
      const response = await axios.post("https://operation-ice3.onrender.com/login", userData);
      if (response.status === 200) {
        // Login successful
        console.log("Login successful");
        // Reset the form
        setEmailId("");
        setPassword("");

        // Store the JWT token in localStorage
        
      localStorage.setItem("user", JSON.stringify(response.data));
        
        navigate("/home");
      } else {
        // Login failed
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="styleouter">
      <div className="LoginData">
        <h2 className="LoginText">Login</h2>
        <form>
          <input
            type="EmailId"
            placeholder="Email"
            onChange={handleEmailchange}
          />
          <br />
          <input
            type="Password"
            placeholder="Password"
            onChange={handlePasswordchange}
          />
        </form>
        <button onClick={handleSubmit}>Login</button>
        <h5>New to the CURD web Application?</h5>
        <Link to="/signup"> Create Account</Link>
      </div>
    </div>
  );
}
