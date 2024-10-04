import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  // Fetch users when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users using Axios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Create a new user using Axios
  const createUser = async () => {
    try {
      await axios.post(
        "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users",
        newUser
      );
      fetchUsers();
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      {/* Form to create a new user */}
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          name="name"
          value={newUser.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <button onClick={createUser}>Create User</button>
      </div>

      {/* Display the list of users */}
      <div>
        <h2>User List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name} - {user.email}</li>
            ))}
          </ul>
        )}
        <button onClick={fetchUsers}>Refresh User List</button>
      </div>
    </div>
  );
}

export default App;
