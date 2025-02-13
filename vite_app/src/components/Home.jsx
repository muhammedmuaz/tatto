import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://tattoos-website-7.onrender.com/offer");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging

        setImages(Array.isArray(data) ? data : data.image || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <div className="Home-container"></div>
      <div className="Home-video">
        <video className="video" src="https://alphatattooindia.com//wp-content//uploads//2024//05//main_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          // width="90%"
          // height="120vh"
          style={{ objectFit: "cover"}}
        />

       </div>
<div className="banner">
      <img className="banner-img" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738903818/tringle-3_utewtd.png"/>
      <h2 className="offer">CHECK OUT OUR LATEST OFFER</h2>
    </div>
   
      <div>
      
        <div style={{ display: "flex", flexWrap: "wrap" }} className="image-container">
          {images.length > 0 ? (
            images.map((image, index) => (
              <img className="image" key={index} src={image.imageurl} alt={`Image ${index}`} width="200" />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;
