// import React from 'react'
// import "./artist.css"
// const OurArtist = () => {
//   return (
//     <div>
//       {/* <h1>artist page</h1> */}



//       <div class="container">
//         <h2>OUR TALENTED AND EXPERIENCED ARTISTS</h2>
//         <p>Find the finest tattoo artists to create your masterpiece. Explore their portfolios and unique art styles.</p>
//         <div className="artists">
//             <div className="artist-card">
//                 <img src="artist1.jpg" alt="Eric D'Silva"/>
//                 <h3>Eric D'Silva</h3>
//                 <a href="#" className="button">Portfolio →</a>
//             </div>
//             <div className="artist-card">
//                 <img src="artist2.jpg" alt="Parth Vasani"/>
//                 <h3>Parth Vasani</h3>
//                 <a href="#" className="button">Portfolio →</a>
//             </div>
//             <div className="artist-card">
//                 <img src="artist3.jpg" alt="Poufa"/>
//                 <h3>Poufa</h3>
//                 <a href="#" className="button">Portfolio →</a>
//             </div>
//         </div>
//         <h3>LET’S MAKE YOUR TATTOO JOURNEY FULL OF CREATIVITY</h3>
//         <a href="#" className="button">Meet Us Now →</a>
//     </div>
//     <div className="footer">
//         <p>EMBRACE THE HEALING - Let the ink tell your story</p>
//         <p>&copy; 2025 Dreamers Tattoo Studio | All Rights Reserved</p>
//     </div>

//     </div>
//   )
// }

// export default OurArtist





// const OurArtist = () => {
//   return (
    // <div className="artist-container">
    //   <div className="container">
    //     <h2>OUR TALENTED AND EXPERIENCED ARTISTS</h2>
    //     <p>Find the finest tattoo artists to create your masterpiece. Explore their portfolios and unique art styles.</p>
    //     <div className="artists">
    //       <div className="artist-card">
    //         <img src="artist1.jpg" alt="Eric D'Silva" />
    //         <h3>Eric D'Silva</h3>
    //         <a href="#" className="button">Portfolio →</a>
    //       </div>
    //       <div className="artist-card">
    //         <img src="artist2.jpg" alt="Parth Vasani" />
    //         <h3>Parth Vasani</h3>
    //         <a href="#" className="button">Portfolio →</a>
    //       </div>
    //       <div className="artist-card">
    //         <img src="artist3.jpg" alt="Poufa" />
    //         <h3>Poufa</h3>
    //         <a href="#" className="button">Portfolio →</a>
    //       </div>
    //     </div>
    //     <h3>LET’S MAKE YOUR TATTOO JOURNEY FULL OF CREATIVITY</h3>
    //     <a href="#" className="button">Meet Us Now →</a>
    //   </div>
    //   <div className="footer">
    //     <p>EMBRACE THE HEALING - Let the ink tell your story</p>
    //     <p>&copy; 2025 Dreamers Tattoo Studio | All Rights Reserved</p>
    //   </div>
    // </div>

//     <div className="container">
//       <div className='artist-container'>
//          <h2 className='artist-text'>OUR TALENTED AND EXPERINCED ARTIST</h2>

//          <p className='artist-text2'> Feel free to check out the awesome work in our portfolios. If you have any questions or want to set up a consultation, reach out
//          to us. We're excited to help you bring your next tattoo idea to life. Let's start this creative journey together!
//          </p>
//       </div>
//     </div>
//   );
// };

// export default OurArtist;



import React from "react";
import "./artist.css";

const artists = [
  {
    name: "Eric D'Silva",
    image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1738655739/par_1_cof2eo.png",
    portfolio: "#",
  },
  {
    name: "Parth Vasani",
    image: "https://res.cloudinary.com/dnbayngfx/image/upload/v1738655739/par_1_cof2eo.png",
    portfolio: "#",
  },
  {
    name: "Poufa",
    image: "artist3.jpg",
    portfolio: "#",
  },
];

const OurArtists = () => {
  return (
    <div className="artist-container">
      <h2>OUR TALENTED AND EXPERIENCED ARTISTS</h2>
      <p>
        Find the finest tattoo artists to create your masterpiece. Explore their
        portfolios and unique art styles.
      </p>
      <div className="artist-grid">
        {artists.map((artist, index) => (
          <div className="artist-card" key={index}>
            <img src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
            <a href={artist.portfolio} className="button">
              Portfolio →
            </a>
          </div>
        ))}
      </div>
      <div className="cta-section">
        <h3>LET’S MAKE YOUR TATTOO JOURNEY FULL OF CREATIVITY</h3>
        <a href="#" className="button primary">
          Meet Us Now →
        </a>
      </div>
      <footer className="footer">
        <p>EMBRACE THE HEALING - Let the ink tell your story</p>
        <p>&copy; 2025 Dreamers Tattoo Studio | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default OurArtists;