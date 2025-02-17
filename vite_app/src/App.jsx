import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// Import your components
import Home from "./components/Home";
import About from "./components/About";
import OurArtist from "./components/OurArtist";
// import OurCategories from "./components/OurCategories";
import SmallCategory from "./components/Ourcategories/SmallCategory";
import StipplingCategory from "./components/Ourcategories/StipplingCategory";
import TravelCategory from "./components/Ourcategories/TravelCategory";
import CoverCategory from "./components/Ourcategories/CoverCategory";
import RealisticCategory from "./components/Ourcategories/RealisticCategory";
import ReligiousCategory from "./components/Ourcategories/ReligiousCategory";
import Contact from "./components/Contact";
import Blog from "./components/Blog";

import "./App.css"; // Import CSS

function App() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <img
              className="logo"
              src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738302308/logo_lgkl6k.png"
              alt="Logo"
            />
            <li className="home">
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/our-artist">OUR ARTIST</Link>
            </li>

            {/* Dropdown for Our Categories */}
            <li
              className="categories-menu"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <Link >OUR CATEGORIES</Link>
              {dropdown && (
                <ul className="dropdown">
                  <li className="small">
                    <Link to="/our-categories/small">SMALL</Link>
                  </li>
                  <li>
                    <Link to="/our-categories/Stippling">STIPPLING</Link>
                  </li>
                  <li>
                    <Link to="/our-categories/Travel">TRAVEL</Link>
                  </li>
                  <li>
                    <Link to="/our-categories/Religious">RELIGIOUS</Link>
                  </li>
                  <li>
                    <Link to="/our-categories/Cover">COVER</Link>
                  </li>
                  <li>
                    <Link to="/our-categories/Realistic">REALISTIC</Link>
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
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-artist" element={<OurArtist />} />
          {/* <Route path="/our-categories" element={<OurCategories />} /> */}
          <Route path="/our-categories/small" element={<SmallCategory />} />
          <Route path="/our-categories/Stippling" element={<StipplingCategory />} />
          <Route path="/our-categories/Travel" element={<TravelCategory />} />
          <Route path="/our-categories/Religious" element={<ReligiousCategory />} />
          <Route path="/our-categories/Realistis" element={<RealisticCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
