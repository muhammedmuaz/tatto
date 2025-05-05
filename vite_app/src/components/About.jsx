// import React from 'react'
// import "./About.css"

// const About = () => {
//   return (
//     <div>
//       {/* <h1>about page</h1> */}

//       <div className='workspace'>
//         <h2 className='text'>OUR WORKSPACE</h2>
//        <img className='studio' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738603822/studio-image-1_vnwgso.png"/>
//       </div>

//       <h2 className='text2'>ABOUT OUR STUDIO</h2>
//       <p className='text3'>Welcome to Tattoo  Dreamers Studio, your creative tattoo hu in Amadavad,
//         Gujarat. We are a team of passionate artists dedicated to
//         transforming your ideas into beautiful body art. We believe in creating
//         unique tattoos that reflect your individuality.
//       </p>

//       <p className='text4'>
//         We prioritize your safety and hygiene. With our state of the art
//         equipment and strict safety protocols, you can relax knowing you are in 
//         good hands. We offer a wide variety of tattoo styles to help you express 
//         yourself in a way that1s true to you.
//       </p>

//       <p className='text5'>
//         Whether it`s your first tattoo or adding to your collection, we are here
//         to make it a memorable experience. So why wait? Come on in and let`s 
//         create something amazing together. We are excited to meet you!
//       </p>

//        <div className='container'>
//         <div className='image-wrapper'>
//       <img  src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738608090/before-pic-on-client_pfnocx.png"/>
//       </div>

//       <img className='overlay-image' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738609202/after-work-pic-on-client_e2ryw1.png"/>
//       </div>

//       <div className="vision">

//       </div>
//     </div>
//   )
// }

// export default About

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import './Home.css';

const About = () => {
  const workspaceRef = useRef(null);
  const aboutContentRef = useRef(null);
  const containerRef = useRef(null);
  const visionMissionRef = useRef(null);
  const team1Ref = useRef(null);
  const team2Ref = useRef(null);
  const team3Ref = useRef(null);
  const team4Ref = useRef(null);

  useEffect(() => {

    if (workspaceRef.current) {
      workspaceRef.current.classList.add('fade-in');
    }
    const handleScroll = () => {
      const sections = [
        // { ref: workspaceRef, className: 'enter-left' },
        { ref: aboutContentRef, className: 'enter-right' },
        { ref: containerRef, className: 'enter-left' },
        { ref: visionMissionRef, className: 'enter-right' },
        { ref: team1Ref, className: 'enter-left' },
        { ref: team2Ref, className: 'enter-right' },
        { ref: team3Ref, className: 'enter-left' },
        { ref: team4Ref, className: 'enter-right' },
      ];

      sections.forEach(section => {
        const rect = section.ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          section.ref.current.classList.add(section.className);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      {/* Workspace Section */}
      <div className="workspace" >
        <h2 className="text">OUR WORKSPACE</h2>
        <img ref={workspaceRef}
          className="studio"
          src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738603822/studio-image-1_vnwgso.png"
          alt="Tattoo Studio"
        />
      </div>

      {/* About Section */}
      <div className="about-content" ref={aboutContentRef}>
        <h2 className="text2">ABOUT OUR STUDIO</h2>
        <p className="text3">
          Welcome to Tattoo Dreamers Studio, your creative tattoo hub in Ahmedabad,
          Gujarat. We are a team of passionate artists dedicated to transforming your ideas
          into beautiful body art.
        </p>
        <p className="text4">
          We prioritize your safety and hygiene. With our state-of-the-art equipment and strict
          safety protocols, you can relax knowing you are in good hands.
        </p>
        <p className="text5">
          Whether it's your first tattoo or you're adding to your collection, we are here
          to make it a memorable experience. Let's create something amazing together!
        </p>
      </div>

      {/* Before & After Image Section */}
      <div className="container" ref={containerRef}>
        <div className="image-wrapper">
          <img
            src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738608090/before-pic-on-client_pfnocx.png"
            alt="Before Tattoo"
          />
        </div>
        <img
          className="overlay-image"
          src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738609202/after-work-pic-on-client_e2ryw1.png"
          alt="After Tattoo"
        />
      </div>

      {/* Vision & Mission Section */}
      <div className="vision-mission" ref={visionMissionRef}>
        <h2 className="vision">OUR VISION</h2>
        <p className="vision-1">
          We dream of a world where tattoos are more than just designs. They're like personal badges that speak to your soul, showing off your uniqueness. At Alpha Tattoo Studio, we want to make getting a tattoo a meaningful and empower experience.
        </p>
        <h2 className="mission">OUR MISSION</h2>
        <p className="mission-1">
          To make sure you feel safe, comfortable, and excited about your tattoo journey. We're here to create an art that tells your story. We want you to leave our studio not just with a tattoo, but with a piece of art that truly represents you.
        </p>
        <div className="team-section">
          {/* Background Video */}
          <video autoPlay loop muted className="team-video">
            <source
              src="https://alphatattooindia.com/wp-content/uploads/2024/05/import_61c082d6899921.13979377.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="team-overlay">
            <h2 className="team">OUR TEAM MEMBERS</h2>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="team1" ref={team1Ref}>
        <img
          className="parth"
          src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738815718/th_id_OIP_12_nlojdd.png"
          alt="Eric D'suza"
        />
        <h2 className="eric">Eric D`suza</h2>
        <h2 className="parth2">ARTIST</h2>
      </div>
      <div className="team2" ref={team2Ref}>
        <img
          className="parth"
          src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738780221/par-1_1_n107sg.png"
          alt="Parth Vasani"
        />
        <h2 className="parth1">PARTH VASANI</h2>
        <h2 className="parth2">ARTIST</h2>
      </div>
      <div className="team3" ref={team3Ref}>
        <img
          className="parth"
          src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738815384/IMG_3884_1_n7nhl2.png"
          alt="Poufa"
        />
        <h2 className="poufa">POUFA</h2>
        <h2 className="parth2">ARTIST</h2>
      </div>
      <div className="team4" ref={team4Ref}>
        <img
          className="parth"
          src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738820859/th_id_OIP_4_lw9bgz.png"
          alt="Sammy"
        />
        <h2 className="sammy">SAMMY</h2>
        <h2 className="parth2">MANAGER</h2>
      </div>

      {/* Button to Reach Studio */}
      <div className="about-button">
        <Link className="button-1" to="/contact">
          REACH OUR STUDIO
        </Link>
      </div>



      <div className='about-footer'>
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
          <Link to="https://github.com/kiranchaudhary18" target="_blank">
            <img className="icon-3" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1740680431/th_id_OIP_21_qktu4l.png" alt="Social Icon" />
          </Link>
        </div>

        <div className="circle-4">
          <Link to="https://x.com/home?lang=en-in" target="_blank">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738668/th_id_OIP_10_dsd5bt.png" alt="Social Icon" />
          </Link>
        </div>

        <div className="circle-5">
          <Link to="https://www.instagram.com/chaudhary_kiran_022/?next=%2F" target="_blank">
            <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738751/th_id_OIP_11_rzyiqj.png" alt="Social Icon" />
          </Link>
        </div>
        {/* LinkedIn Logo */}
        <div className="circle-linkedin">
          <Link to="https://www.linkedin.com/" target="_blank">
            <img className="icon-linkedin" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1715000000/linkedin-icon.png" alt="LinkedIn Icon" />
          </Link>
        </div>
        <div className="home-row"></div>
      </div>
    </div>
  );
};

export default About;
