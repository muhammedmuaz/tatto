// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// // Import your components for each route
// import Home from './components/Home';
// import About from './components/About';
// import OurArtist from './components/OurArtist';
// import OurCategories from './components/OurCategories';
// import Contact from './components/Contact';
// import Blog from './components/Blog';

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/about">About</Link></li>
//             <li><Link to="/our-artist">Our Artist</Link></li>
//             <li><Link to="/our-categories">Our Categories</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//             <li><Link to="/blog">Blog</Link></li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/our-artist" element={<OurArtist />} />
//           <Route path="/our-categories" element={<OurCategories />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/blog" element={<Blog />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import your components for each route
import Home from './components/Home';
import About from './components/About';
import OurArtist from './components/OurArtist';
import OurCategories from './components/OurCategories';
import Contact from './components/Contact';
import Blog from './components/Blog';

// Import CSS
import './App.css'; // or './Navbar.css'

function App() {
  return (
   
  <Router>
      <div>
        
        <nav>
        
          <ul>
          <img className="logo" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738302308/logo_lgkl6k.png"/> 
            <li className="home"><Link to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/our-artist">OUR ARTIST</Link></li>
            <li><Link to="/our-categories">OUR CATEGORIES</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><Link to="/blog">BLOG</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-artist" element={<OurArtist />} />
          <Route path="/our-categories" element={<OurCategories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>

    
  );
}

export default App;