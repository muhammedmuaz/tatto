import React, { useEffect, useState } from 'react';
import './small.css';

const TattooStudio = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  
    fetch('https://tattoos-website-small.onrender.com/small')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging API response
        setTattoos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="tattoo-studio">
      <section className="hero-section">
        <div className="hero-content">
          <h2>SMALL TATTOOS, BIG STORIES</h2>
          <p className="p1">Hey, minimal tattoo lovers, we believe that a small tattoo can make a big statement. Our experienced artists are skilled at creating beautiful, minimalistic designs with expertise.</p>
          <p className="p1">Whether it is a small symbol that carries a special meaning for you or a simple design that appeals to your senses, we're here to help bring your vision to life.</p>
        </div>
        {/* <div className="wave-divider"></div> */}
      </section>

      <section className="gallery-section">
        <h2>OUR SMALL TATTOOS</h2>
        {loading && <p>Loading tattoos...</p>}
        {error && <p>Error: {error}</p>}
        <div className="tattoo-grid">
  {tattoos.length > 0 ? (
    tattoos.map((tattoo, index) => (
      <div key={tattoo.id || index} className="tattoo-card">
        <div className="tattoo-image-container">
          <img src={tattoo.imageurl} alt={`Tattoo design ${index + 1}`} className="tattoo-image" />
          
          {/* Apply hover effect for the first three images */}
          {index < 9 && (
            <div className="hover-overlay">
              <img src="https://res.cloudinary.com/dnbayngfx/image/upload/v1740117582/logo_white_text_no_bg_change_fyg7cz.png" alt="Artist Logo" className="artist-logo" />
              <p className="artist-name">PARTH SAVANI</p>
            </div>
          )}

          {/* Apply hover effect for the 4th, 7th, and 8th images */}
          {[3, 6, 7].includes(index) && (
            <div className="hover-overlay1">
              <img src="https://res.cloudinary.com/dnbayngfx/image/upload/v1740117582/logo_white_text_no_bg_change_fyg7cz.png" alt="Artist Logo" className="artist-logo" />
              <p className="artist-name1">Eric D'suza</p>
            </div>
          )}
        </div>
        {tattoo.name && <p className="tattoo-name">{tattoo.name}</p>}
      </div>
    ))
    ) : (
    !loading && <p>No tattoos found.</p>
   )}
   </div>



      </section>

      <div className='small-footer'>
      <div>
      <img className='dreamers' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738673259/dreamers_ryrags.png"/>
      </div>
      <div>
        {/* <img className='dreamers-1' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738673783/footer-1_sxmzys.png"/> */}

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
         <img className="icon-1" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738734578/location-icon-vector_qrxo2q.png"/>
        </div>
         <p className="p1">A Wing 101, 1st Floor, Samadhan Tower by Asshna Developer, Swami Vivekananda Rd, opposite IndusInd Bank, Maharashtra Housing
           and Area Development Authority Colony, Best Nagar, Goregaon West, Mumbai, Maharashtra 400104</p>

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
        <li>our Artist</li>
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

export default TattooStudio;
