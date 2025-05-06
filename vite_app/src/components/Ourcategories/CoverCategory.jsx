import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import "./cover.css";
import {  Link } from "react-router-dom";

const CoverUpTattoo = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  useEffect(() => {

    window.scrollTo(0, 0);
    const fetchTattoos = async () => {
      try {
        const response = await fetch("http://localhost:4567/stippling");
        const data = await response.json();
        setTattoos(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tattoo images:", error);
        setLoading(false);
      }
    };
    fetchTattoos();
  }, []);

  return (
    <div className="cover-up-tattoo">
      {/* Hero Section */}
      <section className="sm-section">
        <div className="sm-content">
          <h2>COVER-UP TATTOOS</h2>
          <p className="p2">Cover tattoos turn old memories into new masterpieces, blending creativity with fresh ink. They transform past regrets into art that tells a new story.</p>
          <p className="p2">Our experienced artists specialize in creating stunning cover-up designs that not only hide unwanted tattoos but also add a new layer of art to your skin. Whether you want to cover a small mistake or a large piece, we can help you achieve the perfect cover-up.</p>

        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2>OUR COVER-UP TATTOOS</h2>
        {loading ? (
          <p>Loading tattoos...</p>
        ) : (
          <div className="tattoo-grid">
            {tattoos.map((tattoo) => (
              <div key={tattoo.id} className="tattoo-card">
                <img src={tattoo.imageurl} alt="Tattoo" />
                <div className="tattoo-overlay">
                  <button className="like-button">
                    <Heart size={20} />
                    <span>{tattoo.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      
      
      <div className='small-footer'>
        <div>
          <img className='dreamers' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738673259/dreamers_ryrags.png" alt="Dreamers" />
        </div>
        <div>
          <ul className='footer-2'>
            <li className="location">LOCATION</li>
            <li className="use">USEFUL LINKS</li>
            <li className="quick">QUICK LINKS</li>
            <li className="follow">FOLLOW US</li>
          </ul>
          
          <div className="footer-3"></div>
          <div className="footer-4"></div>
          <div className="footer-5"></div>
          <div className="footer-6"></div>

          <div className="circle">
            <img className="icon-1" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734578/location-icon-vector_qrxo2q.png" alt="Location Icon" />
          </div>
          <p className="p1">124 City Road, London, EC1V 2NX <br></br> <br></br> <br></br> <br></br><br></br><br></br></p>

          <div className="circle-1">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734738/th_id_OIP_7_sziayt.png" alt="Email Icon" />
          </div>
          <p className="p2">info@tattooart.io</p>

          <div className="circle-2">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734988/th_id_OIP_8_mdh0ga.png" alt="Phone Icon" />
          </div>
          <p className="p3">+44 7399 502095</p>
        </div>

        <ul className="links">
          <li><Link to="/" className="footer-route">Home</Link ></li>
          <li>Academy</li>
          <li><Link to="/our-artist" className="footer-route">our Artist</Link ></li>
          <li><Link to="/our-categories/small" className="footer-route">Our Categories</Link ></li>
          <li>Home</li>
          <li>Pricing</li>
        </ul>

        <ul className="links-1">
          <li>Terms</li>
          <li><Link to="/about" className="footer-route">About</Link></li>
          <li>Privacy Policy</li>
          <li><Link to="/blog" className="footer-route">Blog</Link></li>
        </ul>

        <div className="circle-3">
                 <Link to="https://github.com/kiranchaudhary18"  target="_blank">
                 <img className="icon-3" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1740680431/th_id_OIP_21_qktu4l.png" alt="Social Icon" />
                 </Link>
               </div>
       
               <div className="circle-4">
          <Link to="https://www.facebook.com/profile.php?id=61573172018439" target="_blank">
            <img className="icon-2" src="https://cdn-icons-png.flaticon.com/256/20/20673.png" alt="Social Icon" />
          </Link>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
};

export default CoverUpTattoo;
