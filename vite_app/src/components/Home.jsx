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
        console.log("Fetched API Data:", data); // Debugging
        setImages(Array.isArray(data) ? data : data.images || []); // Ensure correct property name
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
      <div className="image-container">
  {images.length > 0 ? (
    <>
      {/* First two images centered */}
      <div className="image-row">
        {images.slice(0, 2).map((image, index) => (
          <img className="image" key={index} src={image.imageurl} alt={`Image ${index}`} width="200" />
        ))}
      </div>

      {/* Last two images centered */}
      <div className="image-row1">
        {images.slice(-2).map((image, index) => (
          <img className="image" key={index + 2} src={image.imageurl} alt={`Image ${index + 2}`} width="200" />
        ))}
      </div>
    </>
  ) : (
    <p>No images available</p>
  )}
</div>
      </div>

      <div className="offer-box">
        <p className="offer-text">GRAB THIS OFFER</p>
        <svg className="icon" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
</svg>
</div>

        <div className="offer-box1">
        <p className="offer-text">GRAB THIS OFFER</p>
        <svg className="icon1" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
</svg></div>

        <div className="offer-box3">
        <p className="offer-text">GRAB THIS OFFER</p>
        <svg className="icon3" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
</svg></div>

        <div className="offer-box4">
        <p className="offer-text">GRAB THIS OFFER</p>
        <svg className="icon4" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
</svg></div>

        <div className="heart">
          <p className="heart-text">Every tattoos is </p>
          <p className="heart-text1"> <b>a work of Heart</b> </p>

          <p className="heart-text3">Our Customised tattoos have made a serious mark on people in India and abroad and changed lives for some. Our team approach lets you sit at the table with us while we take the stress of making a tattoo design completely off your plate. We promise that you’ll feel the love, and see the difference creative collaboration makes. </p>
        </div>

    <div className="tattoo-artist-home">
      <p className="home-text">DISCOVER TATTOO FOR YOU</p>
    </div>
    </div>
  );
};

export default Home;
