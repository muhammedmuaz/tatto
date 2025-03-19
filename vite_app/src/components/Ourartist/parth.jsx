import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import "./parth.css"
function App() {
  const portfolioImages = [
    "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800",
    "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800",
    "https://images.unsplash.com/photo-1590246815117-c7c7bb3c9be5?w=800",
    "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800",
    "https://images.unsplash.com/photo-1612451469365-6e3b4f6f8110?w=800",
    "https://images.unsplash.com/photo-1581742009630-4788115517ce?w=800",
  ];

  return (
    <div className="bg-white">
      <div className="hero-section-wrapper">
        <section className="hero-section">
          <img 
            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800" 
            alt="Tattoo Artist" 
            className="hero-image"
          />
          <div className="hero-content">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">PARTH VASANI</h1>
            <h2 className="text-xl md:text-2xl mb-6">EXPERIENCE: 12+ YEARS</h2>
            <h3 className="text-lg md:text-xl mb-8">SPECIALITY: REALISM, RELIGIOUS, COLOR REALISM</h3>
            
            <p className="text-base md:text-lg mb-8">
              Parth Vasani, founder of Alpha Tattoos, is a master storyteller through 
              his realistic and spiritual tattoos. With 12 years of expertise, his jolly 
              demeanor makes every session a memorable journey of laughter and enlightenment.
            </p>

            <div className="social-icons mb-8">
              <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
            </div>

            <a href="#portfolio" className="consultation-button">
              CHECK OUT MY TATTOO ARTISTRY
            </a>
          </div>
        </section>
      </div>

      <section id="portfolio" className="portfolio-grid">
        {portfolioImages.map((image, index) => (
          <div key={index} className="portfolio-item">
            <img src={image} alt={`Tattoo work ${index + 1}`} />
          </div>
        ))}
      </section>

      <div className="text-center py-8 md:py-12 px-4">
        <a href="#contact" className="consultation-button">
          BOOK CONSULTATION
        </a>
      </div>
    </div>
  );
}

export default App;