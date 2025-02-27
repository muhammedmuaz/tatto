import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './nature.css';
import {  Link } from "react-router-dom";
const NatureTattoo = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    window.scrollTo(0, 0);
    fetch('http://localhost:3011/stippling')
      .then((response) => response.json())
      .then((data) => {
        setTattoos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tattoos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="nature-tattoo">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>NATURE TATTOOS</h2>
          <p className="p2">Nature tattoos capture the beauty of the earth, 
            from towering trees to flowing rivers. Each design connects the soul to the wild and free spirit of nature.</p>

            <p className="p2">Our artists specialize in creating intricate designs that bring the essence of nature to your skin. From delicate 
              flowers to majestic trees, we can help you find the perfect nature tattoo to express your connection with the natural world.</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2>OUR NATURE TATTOOS</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="tattoo-grid">
            {tattoos.map((tattoo) => (
              <div key={tattoo.id} className="tattoo-card">
                <img src={tattoo.imageurl} alt={`Nature tattoo design ${tattoo.id}`} />
                <div className="tattoo-overlay">
                    
                      <img className="stippling-hover" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1740117582/logo_white_text_no_bg_change_fyg7cz.png" alt="Logo"  />
                      <span className="text-stippling">POUFA</span>
                  
                  </div>
          
              </div>
            ))}
          </div>
        )}
      </section>

     
      <div className='home-footer'>
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
          <p className="p1">A Wing 101, 1st Floor, Samadhan Tower by Asshna Developer, Swami Vivekananda Rd, opposite IndusInd Bank, Maharashtra Housing and Area Development Authority Colony, Best Nagar, Goregaon West, Mumbai, Maharashtra 400104</p>

          <div className="circle-1">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734738/th_id_OIP_7_sziayt.png" alt="Email Icon" />
          </div>
          <p className="p2">work@tattoodreamers.com</p>

          <div className="circle-2">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734988/th_id_OIP_8_mdh0ga.png" alt="Phone Icon" />
          </div>
          <p className="p3">+91 9106003382</p>
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
               <Link to="https://x.com/home?lang=en-in"  target="_blank">
                 <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738668/th_id_OIP_10_dsd5bt.png" alt="Social Icon" />
                 </Link>
               </div>
       
               <div className="circle-5">
               <Link to="https://www.instagram.com/chaudhary_kiran_022/?next=%2F"  target="_blank">
                 <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738751/th_id_OIP_11_rzyiqj.png" alt="Social Icon" />
                 </Link>
               </div>
        <div className="row"></div>
      </div>
    </div>
  );
};

export default NatureTattoo;
