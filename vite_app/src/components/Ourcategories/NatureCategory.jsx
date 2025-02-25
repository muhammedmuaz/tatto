import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './nature.css';

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

      <div className="small-footer">
        <div>
          <img className="dreamers" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738673259/dreamers_ryrags.png" />
        </div>
        <div>
          <ul className="footer-2">
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
            <img className="icon-1" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734578/location-icon-vector_qrxo2q.png"/>
          </div>
          <p className="p1">
            A Wing 101, 1st Floor, Samadhan Tower by Asshna Developer, 
            Swami Vivekananda Rd, opposite IndusInd Bank, Maharashtra Housing
            and Area Development Authority Colony, Best Nagar, Goregaon West, Mumbai, Maharashtra 400104
          </p>

          <div className="circle-1">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734738/th_id_OIP_7_sziayt.png"/>
          </div>
          <p className="p2">work@tattoodreamers.com</p>

          <div className="circle-2">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734988/th_id_OIP_8_mdh0ga.png"/>
          </div>
          <p className="p3">+91 9106003382</p>
        </div>

        <ul className="links">
          <li>Home</li>
          <li>Academy</li>
          <li>Our Artist</li>
          <li>Our Categories</li>
          <li>Home</li>
          <li>Pricing</li>
        </ul>

        <ul className="links-1">
          <li>Terms</li>
          <li>About</li>
          <li>Privacy Policy</li>
          <li>Blog</li>
        </ul>

        <div className="circle-3">
          <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738596/th_id_OIP_9_ixrdwx.png"/>
        </div>

        <div className="circle-4">
          <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738668/th_id_OIP_10_dsd5bt.png"/>
        </div>

        <div className="circle-5">
          <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738751/th_id_OIP_11_rzyiqj.png"/>
        </div>
        
        <div className="row"></div>
      </div>
    </div>
  );
};

export default NatureTattoo;
