
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


import Home from "./components/Home";
import About from "./components/About";
import OurArtist from "./components/OurArtist";
import Eric from "./components/Ourartist/Eric";
import Parth from "./components/Ourartist/Parth";
import Poufa from "./components/Ourartist/Poufa";
import SmallCategory from "./components/Ourcategories/SmallCategory";
import StipplingCategory from "./components/Ourcategories/StipplingCategory";
import LoveCategory from "./components/Ourcategories/LoveCategory";
import CoverCategory from "./components/Ourcategories/CoverCategory";
import NatureCategory from "./components/Ourcategories/NatureCategory";
import ReligiousCategory from "./components/Ourcategories/ReligiousCategory";
import Contact from "./components/Contact";
import Blog from "./components/Blog";

import "./App.css"; // Import CSS

function App() {
  const [dropdown, setDropdown] = useState(false);
  const [artistdropdown, setArtistDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <div className="logo-container">
            <img
              className="logo"
              src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738302308/logo_lgkl6k.png"
              alt="Logo"
            />
          </div>
          <div className="nav-links">
            <ul>
              <li className="home">
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li
                className="categories-menu"
                onMouseEnter={() => setArtistDropdown(true)}
                onMouseLeave={() => setArtistDropdown(false)}
              >
                <Link to="/our-artist">OUR ARTIST</Link>
                {artistdropdown && (
                  <ul className="dropdown">
                    <li className="small">
                      <Link to="/ourartist/Eric">Eric Dsuza</Link>
                    </li>
                    <li>
                      <Link to="/ourartist/Parth">PARTH SAVANI</Link>
                    </li>
                    <li>
                      <Link to="/ourArtist/Poufa">POUFA</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                className="categories-menu"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link>OUR CATEGORIES</Link>
                {dropdown && (
                  <ul className="dropdown">
                    <li className="small">
                      <Link to="/our-categories/small">SMALL</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Stippling">STIPPLING</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Love">LOVE</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Religious">RELIGIOUS</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Cover">COVER</Link>
                    </li>
                    <li>
                      <Link to="/our-categories/Nature">NATURE</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
              <li>
                <Link to="/blog">BLOG</Link>
              </li>
            </ul>
          </div>
          <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={isMenuOpen ? "open" : ""}></span>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-artist" element={<OurArtist />} />
          <Route path="/ourartist/Eric" element={<Eric />} />
          <Route path="/ourartist/Parth" element={<Parth />} />
          <Route path="/ourartist/Poufa" element={<Poufa />} />
          <Route path="/our-categories/small" element={<SmallCategory />} />
          <Route path="/our-categories/Stippling" element={<StipplingCategory />} />
          <Route path="/our-categories/Love" element={<LoveCategory />} />
          <Route path="/our-categories/Religious" element={<ReligiousCategory />} />
          <Route path="/our-categories/Cover" element={<CoverCategory />} />
          <Route path="/our-categories/Nature" element={<NatureCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>

     
  );
}

export default App; 