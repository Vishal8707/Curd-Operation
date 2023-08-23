import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Delete() {
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkToken = JSON.parse(localStorage.getItem('user'))
  

  useEffect(() => {
    if (!checkToken) {
      navigate("/home", { replace: true });
    }
  }, [checkToken, navigate]);

  const handleUserIdchange = (e) => {
    setUserId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage("Please fill out the userUserId details.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/delete/${userId}`,
        {
          headers: {
            "x-api-key": `${checkToken.data.token}` // Add the token to the headers
          } }
      );
console.log(response)
      if (response.status === 200) {
        console.log("Update successful");
        // Reset the form
        setUserId("");
        navigate("/home");
        window.alert("User deleted successfully!");
      } else {
        console.error("User delete failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="registerOuter">
      <div className="register">
        <h2>Update</h2>
        <form>
          <input
            type="userId"
            placeholder="Enter User Id"
            onChange={handleUserIdchange}
          />{" "}
          <br />
          <p>{errorMessage}</p>
        </form>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
