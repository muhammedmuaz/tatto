import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './stippling.css';
import '../Home.css';
import { Link } from "react-router-dom";

const StipplingTattoo = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tattoos from API
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTattoos = async () => {
      try {
        const response = await fetch('https://tattoos-website-9-stippling.onrender.com/stippling');
        if (!response.ok) {
          throw new Error('Failed to fetch tattoos');
        }
        const data = await response.json();
        setTattoos(data);
      } catch (error) {
        console.error('Error fetching tattoos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTattoos();
  }, []);

 
  const handleLike = async (tattooId) => {
    try {
    
      const tattoo = tattoos.find((t) => t._id === tattooId);
      if (!tattoo) return;

      
      const isLiked = tattoo.liked || false;
      const updatedLikes = isLiked ? tattoo.likes - 1 : tattoo.likes + 1;

      
      setTattoos((prevTattoos) =>
        prevTattoos.map((t) =>
          t._id === tattooId ? { ...t, likes: updatedLikes, liked: !isLiked } : t
        )
      );

      
      const response = await fetch(`https://tattoos-website-9-stippling.onrender.com/stippling/${tattooId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: updatedLikes, liked: !isLiked }), 
      });

      if (!response.ok) throw new Error('Failed to update like status');

      
      const updatedTattoo = await response.json();

      
      setTattoos((prevTattoos) =>
        prevTattoos.map((t) =>
          t._id === updatedTattoo._id ? updatedTattoo : t
        )
      );
    } catch (error) {
      console.error('Error updating like status:', error);

      
      setTattoos((prevTattoos) =>
        prevTattoos.map((t) =>
          t._id === tattooId ? { ...t, likes: tattoo.likes, liked: tattoo.liked } : t
        )
      );
    }
  };
  
  return (
    <div className="stippling-tattoo">
   
      <section className="sm-section">
        <div className="sm-content">
          <h2>STIPPLING TATTOOS</h2>
          <p className='p2'>
            "Stippling tattoos bring art to life with thousands of tiny dots, 
            creating depth and detail like a masterpiece on skin. Each dot forms a story, 
            blending shadows and light into a timeless design."
          </p>
          <p className='p2'>
            Our skilled artists specialize in creating intricate and detailed stippling 
            designs that bring your vision to life. From geometric patterns to realistic portraits, 
            we can help you achieve the perfect stippling tattoo.
          </p>
        </div>
      </section>

   
      <section className="gallery-section">
        <h2>OUR STIPPLING TATTOOS</h2>
        
        {loading ? (
          <p>Loading tattoos...</p>
        ) : (
          <div className="tattoo-grid">
            {tattoos.length > 0 ? (
              tattoos.map((tattoo) => (
                <div key={tattoo._id} className="tattoo-card">
                  <img src={tattoo.imageurl} className="tattoo-image" />
                  <div className="tattoo-overlay">
                    <img className="stippling-hover" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1740117582/logo_white_text_no_bg_change_fyg7cz.png" alt="Logo" />
                    <span className="text-stippling">POUFA</span>
                  </div>
                  <div className="like-button-container">
                  <button className="like-button" onClick={() => handleLike(tattoo._id)}>
  <Heart size={24} className={tattoo.liked ? 'liked' : ''} fill={tattoo.liked ? 'red' : 'none'} />
  <span>{tattoo.likes ?? 0}</span>
</button>

                  </div>
                </div>
              ))
            ) : (
              <p>No tattoos found.</p>
            )}
          </div>
        )}
      </section>

      {/* Footer Section */}
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
        <div className="home-row"></div>
      </div>
    </div>
  );
};

export default StipplingTattoo;