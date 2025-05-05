import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import "./love.css";
import { Link } from "react-router-dom";
const LoveTattoo = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  useEffect(() => {

    window.scrollTo(0, 0);
    const fetchTattoos = async () => {
      try {
        const response = await fetch("http://localhost:3011/stippling"); // Replace with the actual API URL
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
    <div className="love-tattoo">
      {/* Hero Section */}
      <section className="sm-section">
        <div className="sm-content">
          <h2>LOVE TATTOOS</h2>
          <p className="p4"> Love tattoos are more than just ink—they're symbols of deep emotions, memories, and connections
            that last forever. Whether it's a heart, a name, or a meaningful design, each piece tells a unique love story.</p>
          <p className="p4">Our artists specialize in creating heartfelt and romantic tattoos that symbolize your love. From
            delicate hearts to intricate couple designs, we can help you find the perfect love tattoo to express your emotions.</p>

        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2>OUR LOVE TATTOOS</h2>
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
          <Link to="https://www.linkedin.com/company/40770349" target="_blank">
            <img className="icon-2" src="https://i.pinimg.com/originals/18/7e/51/187e511cdb50bf5614bc5dbc29eaeed8.jpg" alt="LinkedIn Logo" />
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

export default LoveTattoo;
