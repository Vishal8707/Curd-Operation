import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Update() {
  const [userId, setUserId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkToken = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    if (!checkToken) {
      navigate("/update", { replace: true });
    }
  }, [checkToken, navigate]);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleEmailIdChange = (e) => {
    setEmailId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage("Please fill out the user ID.");
      return;
    }

    try {
      const response = await axios.put(
        `https://operation-ice3.onrender.com/updateData/${userId}`,
        { emailId },
        {
          headers: {
            "x-api-key": `${checkToken.data.token}`, // Add the token to the headers
          },
        }
      );
      if (response.status === 200) {
        console.log("Update successful");
        // Reset the form
        setUserId("");
        setEmailId("");
        setErrorMessage("");
        navigate("/home");
        window.alert("User data updated successfully!");
      } else {
        console.error("Update failed:", response.data.error);
        setErrorMessage("Failed to update user data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while updating user data.");
    }
  };

  return (
    <div className="registerOuter">
      <div className="register">
        <h2>Update</h2>
        <form>
          <input
            type="text"
            placeholder="Enter User ID"
            onChange={handleUserIdChange}
            value={userId} // Add this line to bind the input value
          />
          <br />
          <input
            type="text"
            placeholder="Change Email Address"
            onChange={handleEmailIdChange}
            value={emailId} // Add this line to bind the input value
          />
          <br />
          <p>{errorMessage}</p>
        </form>
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
}
