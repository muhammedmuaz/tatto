import React, {useEffect} from 'react'
import "./artist.css"
import "./Home.css";
import { Link } from "react-router-dom";
const OurArtist = () => {

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
   
  return (
    <div className='Artist'>
      
       <div className="Artist-Header">
        <h2 className="Artist-text">OUR TALENTED AND EXPERINCED ARTIST</h2>
        <p className="Artist-text1">Feel free to check out the awesome work in
           our portfolios. If you have any questions or want to set up a consultation, reach out
           to us. We're excited to help you bring your next tattoo idea to life. Let's start this creative journey together!</p>

           <div className="artist-section">
      {/* Background Video */}
      <video autoPlay loop muted className="artist-video">
        <source
          src="https://alphatattooindia.com/wp-content/uploads/2024/05/import_61c082d6899921.13979377.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="artist-overlay">
        <h2 className="Artist-Name">CHECK OUT OUR ARTIST</h2>
      </div>
    </div>
       </div>

       <div className="Artist-box">
       <img className="parth" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738815718/th_id_OIP_12_nlojdd.png"/>
       <h2 className="eric">Eric D`suza</h2>
       </div>

       <div className="Artist-box1">
       <img className="parth" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738780221/par-1_1_n107sg.png"/>
       <h2 className="parth1">PARTH VASANI</h2>
       </div>

       <div className="Artist-box2">
       <img className="parth" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738815384/IMG_3884_1_n7nhl2.png"/>
       <h2 className="poufa">POUFA</h2>
       </div>

       
    
       <div className='Artist-footer'>
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
          <Link to="https://www.linkedin.com/company/40770349" target="_blank">
            <img className="icon-2" src="https://i.pinimg.com/originals/18/7e/51/187e511cdb50bf5614bc5dbc29eaeed8.jpg" alt="LinkedIn Logo" />
          </Link>
        </div>
       
        <div className="circle-4">
          <Link to="https://www.facebook.com/profile.php?id=61573172018439" target="_blank">
            <img className="icon-2" src="https://cdn-icons-png.flaticon.com/256/20/20673.png" alt="Social Icon" />
          </Link>
        </div>
       
        <div className="home-row"></div>
      </div>
    </div>
  )
}

export default OurArtist
