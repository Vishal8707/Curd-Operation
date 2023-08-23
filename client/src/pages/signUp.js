import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkToken = localStorage.getItem("token");

  useEffect(() => {
    if (checkToken) {
      navigate("/home", { replace: true });
    }
  }, [checkToken, navigate]);

  const handlemobileNumberchange = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleUsernamechange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailIdchange = (e) => {
    setEmailId(e.target.value);
  };
  const handlePasswordchange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !emailId || !mobileNumber || !password) {
      setErrorMessage("Please fill out all the details.");
      return;
    }

    let userData = {
      mobileNumber,
      userName,
      emailId,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        userData
      );

      if (response.status === 201) {
        console.log("Signup successful");
        // Reset the form
        setMobileNumber("");
        setUserName("");
        setEmailId("");
        setPassword("");
        setErrorMessage("");
        navigate("/");
      } else {
        console.error("Signup failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="registerOuter">
      <div className="register">
        <h2>SignUp</h2>
        <form>
          <input
            type="userName"
            placeholder="User Name"
            onChange={handleUsernamechange}
          />{" "}
          <br />
          <input
            type="emailId"
            placeholder="Email Address"
            onChange={handleEmailIdchange}
          />{" "}
          <br />
          <input
            type="mobileNumber"
            placeholder="mobile Number"
            onChange={handlemobileNumberchange}
          />{" "}
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordchange}
          />
          <p>{errorMessage}</p>
        </form>
        <button onClick={handleSubmit}>SignUp</button>
      </div>
    </div>
  );
}
