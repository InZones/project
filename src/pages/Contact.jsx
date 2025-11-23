import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
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

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Please fill out the form below.</p>
        <form action="contact.php" method="POST" className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>© 2025 EsMa3. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Contact;
