import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const error = params.get("error");

    if (success === "registration_complete") {
      setMessage("Registration successful! You can now log in.");
      setMessageType("success");
    } else if (error) {
      const errorMessages = {
        missing_fields: "Please fill in all fields.",
        invalid_username_length:
          "Username must be between 3 and 50 characters.",
        invalid_email: "Please enter a valid email address.",
        password_too_short: "Password must be at least 6 characters long.",
        password_mismatch: "Passwords do not match.",
        username_exists: "Username already exists.",
        email_exists: "Email already exists.",
        server_error: "Server error. Please try again later.",
      };

      setMessage(
        errorMessages[error] || "An error occurred. Please try again."
      );
      setMessageType("error");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setMessage("Username must be between 3 and 20 characters.");
      setMessageType("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      window.location.href = "/login?success=registration_complete";
    } catch (err) {
      setMessage(err.message || "An error occurred. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <main>
      <header>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" className="nav-item">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-item">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-item">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/search" className="nav-item">
                Search
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-item">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-item">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="auth-section">
        <h2>Create Your Account</h2>

        {}
        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              maxLength="20"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </section>
    </main>
  );
};

export default Register;
