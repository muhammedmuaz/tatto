import React from 'react'
import "./About.css"

const About = () => {
  return (
    <div>
      {/* <h1>about page</h1> */}

      <div className='workspace'>
        <h2 className='text'>OUR WORKSPACE</h2>
       <img className='studio' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738603822/studio-image-1_vnwgso.png"/>
      </div>

      <h2 className='text2'>ABOUT OUR STUDIO</h2>
      <p className='text3'>Welcome to Tattoo  Dreamers Studio, your creative tattoo hu in Amadavad,
        Gujarat. We are a team of passionate artists dedicated to
        transforming your ideas into beautiful body art. We believe in creating
        unique tattoos that reflect your individuality.
      </p>

      <p className='text4'>
        We prioritize your safety and hygiene. With our state of the art
        equipment and strict safety protocols, you can relax knowing you are in 
        good hands. We offer a wide variety of tattoo styles to help you express 
        yourself in a way that1s true to you.
      </p>

      <p className='text5'>
        Whether it`s your first tattoo or adding to your collection, we are here
        to make it a memorable experience. So why wait? Come on in and let`s 
        create something amazing together. We are excited to meet you!
      </p>
       
       <div className='container'>
        <div className='image-wrapper'>
      <img  src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738608090/before-pic-on-client_pfnocx.png"/>
      </div>

      <img className='overlay-image' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738609202/after-work-pic-on-client_e2ryw1.png"/>
      </div>
    </div>
  )
}

export default About
