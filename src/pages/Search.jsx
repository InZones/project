import React from "react";
import { Link } from "react-router-dom";


const searchHistory = [
  { id: 1, title: "Easy On Me", artist: "Adele", cover: "../assets/someone.jpg" },
  { id: 2, title: "HUMBLE.", artist: "Kendrick Lamar", cover: "../assets/humble.jpg"},
  { id: 3, title: "Chandelier", artist: "Sia", cover: "../assets/chandelier.jpg"},
];

const Search = () => {
  return (
    <main>
<header>
  
  <nav>
    <ul className='nav-list'>
          <li><Link to="/" className="nav-item">Home</Link></li>
          <li><Link to="/explore" className="nav-item">Explore</Link></li>
          <li><Link to="/about" className="nav-item">About</Link></li>
          <li><Link to="/contact" className="nav-item">Contact</Link></li>
          <li><Link to="/search" className="nav-item">Search</Link></li>
          <li><Link to="/login" className="nav-item">Login</Link></li>
          <li><Link to="/register" className="nav-item">Register</Link></li>
        </ul>
  </nav>
</header>


      <section className="search-section">
        <div className="search-container">
          <h2>Find Your Favorite Music</h2>
          <form className="search-form">
            <input
              type="text"
              id="search-bar"
              name="search"
              placeholder="Search for songs, artists, or genres"
              required
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
        <div className="image-placeholder"></div>
      </section>

      <section className="search-results">
        <h2>Search History</h2>
        <div className="results-container">
          {searchHistory.map((item) => (
            <div key={item.id} className="result-item">
              <img src={item.cover} alt={item.artist} />
              <h3>
                {item.artist} - {item.title}
              </h3>
              <Link to={`/song-details?song=${item.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2025 EsMa3 | All Rights Reserved</p>
      </footer>
    </main>
  );
};

export default Search;
