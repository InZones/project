import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/auth/check_session.php")
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedin) {
          alert("Please log in to access the dashboard");
          window.location.href = "/login.html";
        } else {
          setUsername(data.username);
          loadUserData();
        }
      })
      .catch(() => {
        alert("Error checking session. Please try logging in again.");
        window.location.href = "/login.html";
      });
  }, []);

  const loadUserData = () => {
    fetch("/api/get_playlists.php")
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch(() => setPlaylists("error"));

    fetch("/api/get_favorites.php")
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch(() => setFavorites("error"));
  };

  const createPlaylist = () => {
    const name = prompt("Enter playlist name:");
    if (!name) return;

    fetch("/api/create_playlist.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) loadUserData();
        else alert(data.message || "Error creating playlist");
      })
      .catch(() => alert("Error creating playlist"));
  };

  const savePreferences = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("/api/save_preferences.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => alert(data.success ? "Preferences saved!" : data.message))
      .catch(() => alert("Error saving preferences"));
  };

  return (
    <main>
 
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>
      <section className="dashboard-section">
        <h2>Welcome, {username}!</h2>

        <div className="dashboard-grid">
          {}
          <div className="dashboard-card">
            <h3>Your Playlists</h3>
            <div>
              {playlists === "error" ? (
                <p>Error loading playlists</p>
              ) : playlists.length === 0 ? (
                <p>No playlists yet. Create one!</p>
              ) : (
                playlists.map((p, i) => (
                  <div key={i} className="playlist-item">
                    <h4>{p.name}</h4>
                    <p>{p.song_count} songs</p>
                  </div>
                ))
              )}
            </div>
            <button onClick={createPlaylist} className="dashboard-btn">
              Create New Playlist
            </button>
          </div>

          {}
          <div className="dashboard-card">
            <h3>Favorite Songs</h3>
            <div>
              {favorites === "error" ? (
                <p>Error loading favorites</p>
              ) : favorites.length === 0 ? (
                <p>No favorite songs</p>
              ) : (
                favorites.map((song, i) => (
                  <div key={i} className="song-item">
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {}
          <div className="dashboard-card">
            <h3>Music Preferences</h3>
            <form onSubmit={savePreferences} className="preferences-form">
              <label>Favorite Genre:</label>
              <select name="favorite-genre">
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
              </select>
              <button className="dashboard-btn">Save Preferences</button>
            </form>
          </div>
        </div>
      </section>
      <footer>
        <p>© 2025 EsMa3. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Dashboard;
