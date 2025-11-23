import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      let msg = "";
      switch (error) {
        case "invalid_credentials":
          msg = "Invalid username/email or password.";
          break;
        case "missing_fields":
          msg = "Please fill in all fields.";
          break;
        case "server_error":
          msg = "Server error. Please try again later.";
          break;
        default:
          msg = "An error occurred. Please try again.";
      }
      setMessage(msg);
      setType("error");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please fill in all fields.");
      setType("error");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      navigate("/dashboard");
    } catch (err) {
      setMessage(err.message);
      setType("error");
    }
  };

  return (
    <div>
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
        <h2>Login to Your Account</h2>

        {message && <div className={`message ${type}`}>{message}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username or Email:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
