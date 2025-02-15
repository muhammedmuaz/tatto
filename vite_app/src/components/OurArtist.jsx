import React from 'react'
import "./artist.css"

const OurArtist = () => {
  return (
    <div className='Artist'>
      
       <div className="Artist-Header">
        <h2 className="Artist-text">OUR TALENTED AND EXPERINCED ARTIST</h2>
        <p className="Artist-text1">Feel free to check out the awesome work in
           our portfolios. If you have any questions or want to set up a consultation, reach out
           to us. We're excited to help you bring your next tattoo idea to life. Let's start this creative journey together!</p>

           <h2 className="Artist-Name">CHECK OUT OUR ARTIST</h2>
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
  )
}

export default OurArtist
