import React from 'react'
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Esma3 - Explore Music</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
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


   <section className="hero-section">
  <h2>Welcome to Esma3</h2>
  <p>Your destination for discovering the best music from artists worldwide!</p>
  <Link to="/explore" className="nav-item">Explore Now</Link>
</section>

    <section>
      <h2 class="subtitle">Featured Songs</h2>
      <div class="featured-songs">
        <div class="song-item">
          <img src="/assets/someone.jpg" alt="Adele" />
          <h3>Adele - Easy On Me</h3>
          <a>View Details</a>
        </div>
        <div class="song-item">
          <img src="/assets/humble.jpg" alt="Kendrick Lamar" />
          <h3>Kendrick Lamar - HUMBLE.</h3>
          <a>View Details</a>
        </div>
        <div class="song-item">
          <img src="/assets/tam.jpg" alt="Amr Diab" />
          <h3>Amr Diab - Tamally Maak</h3>
          <a>View Details</a>
        </div>
        <div class="song-item">
          <img src="assets/chandelier.jpg" alt="Sia" />
          <h3>Sia - Chandelier</h3>
          <a href="song-details-sia.html">View Details</a>
        </div>
      </div>
    </section>

    <footer>
      <p>© 2025 Esma3 | All Rights Reserved</p>
    </footer>

    
  </body>
</>
  )
}

export default Index;


