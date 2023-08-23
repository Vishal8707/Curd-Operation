import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of items to display per page
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'))
  
  
  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("https://operation-i1qy.onrender.com/allUser", {
      headers: {
        "x-api-key": `${user.data.token}` // Add the token to the headers
      }
    });
    
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = userData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < userData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  // Search logic
  const handleSearch = () => {
    // Filter userData based on the search query
    const filteredData = userData.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.emailId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobileNumber.toString().includes(searchQuery)
    );

    setUserData(filteredData); // Update the userData with the filtered data
    setCurrentPage(1); // Reset currentPage to 1 after search to show the first page
  };

  // Handle update profile button click
  const handleUpdateProfile = () => {
    navigate("/update");
  };
  const handleDeleteUser = () => {
    navigate("/delete");
  };

  // Handle logout button click
  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing local storage, redirecting to login page
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={handleDeleteUser}>Delete</button>
          </li>
          <li>
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="user-list-container">
        <h2>Users List</h2>
        {/* Search input and button */}
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by UserName, Email, or Mobile Number"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <ul className="user-list">
          {currentPageData.map((user) => (
            <li key={user._id} className="user-item">
              <strong>UserId:</strong> {user._id}
              <br />
              <strong>UserName:</strong> {user.userName}
              <br />
              <strong>Email:</strong> {user.emailId}
              <br />
              <strong>Mobile Number:</strong> {user.mobileNumber}
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <button onClick={handleNextPage} disabled={endIndex >= userData.length}>
            Next
          </button>
        </div>   
      </div>
    </div>
  );
}
