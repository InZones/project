import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); 
 
  useEffect(() => {
    fetch("/auth/check_session.php")
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedin) {
          window.location.href = "/login";
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (username) formData.append("username", username);
    if (password) formData.append("password", password);

    try {
      const res = await fetch("/auth/update_profile.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessage(data.success ? "Profile updated successfully!" : data.message);
      setType(data.success ? "success" : "error");

      if (data.success) {
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
      setType("error");
    }
  };

  return (
    <main className="profile-container">


<header>
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/explore">Explore</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/search">Search</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </ul>
  </nav>
</header>


      <h2>Profile Settings</h2>

      {message && (
        <div className={`message ${type}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>New Username</label>
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>

      <footer>
        <p>© 2025 EsMa3 | All Rights Reserved</p>
      </footer>
    </main>
  );
};

export default Profile;