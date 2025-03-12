import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QREzbGzvn2xju5ejFTJzqm2HX3RZiyDBbbxT8EIVB568UB72NlPYlMb8yYhekEnP0ChNpzbWzh4lz1oGhA7iLo000G3mPnGlv'); // Replace with your actual Stripe publishable key

// Payment Form Component
const PaymentForm = ({ onClose, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      console.log("Sending payment request with amount:", amount * 100);
      const response = await fetch("http://localhost:3000/create-payment-intent", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
      }

      const { clientSecret } = await response.json();
      console.log("Received clientSecret:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        console.error("Stripe error:", result.error);
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log("Payment succeeded:", result.paymentIntent);
        alert('Payment successful!');
        onClose();
      }
    } catch (err) {
      console.error("Payment error:", err.message);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-popup">
      <div className="payment-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Make Payment</h3>
        <form onSubmit={handleSubmit}>
          <CardElement options={{
            style: {
              base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
              invalid: { color: '#9e2146' },
            },
          }} />
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            disabled={!stripe || processing}
            className="payment-submit"
          >
            {processing ? 'Processing...' : `Pay $${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [actors, setActors] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {  
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [imagesRes, categoriesRes, actorsRes] = await Promise.all([
          fetch("https://tattoos-website-9-offer.onrender.com/offer"),
          fetch("https://tattoos-website-9-categories.onrender.com/homecategories"),
          fetch("https://tattoos-website-9-actors.onrender.com/actors"),
        ]);
  
        if (!imagesRes.ok || !categoriesRes.ok || !actorsRes.ok) {
          throw new Error("One or more requests failed");
        }
  
        const imagesData = await imagesRes.json();
        const categoriesData = await categoriesRes.json();
        const actorsData = await actorsRes.json();
  
        setImages(Array.isArray(imagesData) ? imagesData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setActors(Array.isArray(actorsData) ? actorsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designPreference: "",
    appointmentDate: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showPayment, setShowPayment] = useState(false); // State for payment popup
  const [paymentAmount] = useState(50); // Fixed payment amount, adjust as needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.mobile) {
      setMessage("❌ Please fill in all required fields.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
  
    setLoading(true);
    setMessage("");
    setShowMessage(false);
  
    try {
      const response = await fetch(
        "https://tattoos-website-9-login.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      setMessage("✅ Form submitted successfully!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
  
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designPreference: "",
        appointmentDate: "",
      });
    } catch (error) {
      console.error("Form submission error:", error.message);
      setMessage("❌ Submission failed. Please try again.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePaymentClick = () => {
    setShowPayment(true);
  };

  return (
    <div className="main">
      <div className="Home-container">
        <div className="Home-video">
          <video
            className="video"
            src="https://alphatattooindia.com/wp-content/uploads/2024/05/main_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="banner">
        <img className="banner-img" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738903818/tringle-3_utewtd.png"/>
        <h2 className="offer">CHECK OUT OUR LATEST OFFER</h2>
      </div>
     
      <div>
        <div className="image-container">
          {images.length > 0 ? (
            <>
              <div className="image-row">
                {images.slice(0, 2).map((image, index) => (
                  <img className="image" key={index} src={image.imageurl} alt={`Image ${index}`} width="200" />
                ))}
              </div>
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
        <p className="offer-text" onClick={scrollToForm}>GRAB THIS OFFER</p>
        <svg className="icon" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
        </svg>
      </div>

      {/* Other offer boxes remain unchanged */}
      <div className="offer-box1">
        <p className="offer-text" onClick={scrollToForm}>GRAB THIS OFFER</p>
        <svg className="icon1" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
        </svg>
      </div>

      <div className="offer-box3">
        <p className="offer-text" onClick={scrollToForm}>GRAB THIS OFFER</p>
        <svg className="icon3" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
        </svg>
      </div>

      <div className="offer-box4">
        <p className="offer-text" onClick={scrollToForm}>GRAB THIS OFFER</p>
        <svg className="icon4" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
        </svg>
      </div>

      <div className="heart">
        <p className="heart-text">Every tattoo is </p>
        <p className="heart-text1"><b>a work of Heart</b></p>
        <p className="heart-text3">Our Customised tattoos have made a serious mark on people in India and abroad...</p>
      </div>

      {/* Rest of your existing JSX remains unchanged until the form section */}
      <div className="tattoo-artist-home">
        <video autoPlay loop muted className="background-video">
          <source src="https://alphatattooindia.com/wp-content/uploads/2024/05/import_61c082d6899921.13979377.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <p className="home-text">DISCOVER TATTOO FOR YOU</p>
          <div className="explore" onClick={() => document.getElementById("home-category").scrollIntoView({ behavior: "smooth" })}>
            <p className="explore-1">EXPLORE MORE</p>
            <svg className="explore-icon" width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Artist section */}
      <h2 className="our-artist-home">OUR ARTIST</h2>
      <div className="artist-img-home">
        <div className="eric"> 
          <img className="eric-1" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738815718/th_id_OIP_12_nlojdd.png"/>
        </div>
        <div className="parth-1">
          <img className="eric-1" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738780221/par-1_1_n107sg.png"/>
        </div>
        <div className="poufa">
          <img className="eric-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738815384/IMG_3884_1_n7nhl2.png"/>
        </div>
      </div>
      <div className="artist-name">
        <h2 className="name">Eric D`suza</h2>
        <h2 className="name-1">PARTH VASANI</h2>
        <h2 className="name-2">POUFA</h2>
      </div>
      <div className="artist-portfolio">
        <Link className="portfolio" to="./components/Ourartist/Eric"><h3 className="portfolio-text">PORTFOLIO</h3>
          <svg className="p-icon" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
          </svg>
        </Link>
        <Link className="portfolio-1" to="./components/Ourartist/Parth"><h3 className="portfolio-text">PORTFOLIO</h3>
          <svg className="p-icon" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
          </svg>
        </Link>
        <Link className="portfolio-2" to="./components/Ourartist/Poufa"><h3 className="portfolio-text">PORTFOLIO</h3>
          <svg className="p-icon" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
          </svg>
        </Link>
      </div>

      {/* Categories section */}
      <h2 className="tattoo-categories">OUR TATTOO CATEGORIES</h2>
      <div className="black"></div>
      <section id="home-category">
        <div className="categories-container">
          {categories.length > 0 ? (
            <>
              <div className="category-row">
                {categories.slice(0, 3).map((category, index) => (
                  <Link key={index} to={`/our-categories/${category.name.toLowerCase()}`} className="category-card">
                    <img src={category.imageUrl1 || category.imageurl} alt={category.name} className="category-image" />
                    <h3 className="category-name">{category.name}</h3>
                  </Link>
                ))}
              </div>
              <div className="category-row">
                {categories.slice(-3).map((category, index) => (
                  <Link key={index + 3} to={`/our-categories/${category.name.toLowerCase()}`} className="category-card">
                    <img src={category.imageUrl1 || category.imageurl} alt={category.name} className="category-image" />
                    <div className="name-box">
                      <h3 className="category-name">{category.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </section>

      {/* Actors section */}
      <h2 className="col">COLLABORATED WITH RENOWNED PERSONALITIES</h2>
      <h2 className="col1">OUR JOURNEY WITH TALENTED ACTORS</h2>
      <div className="actors-container">
        {actors.length > 0 ? (
          <div className="actors-row">
            {actors.map((actor, index) => (
              <div key={index} className="actor-card">
                <img src={actor.imageUrl2} alt={actor.name} className="actor-image" />
                <h3 className="actor-name">{actor.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading actors...</p>
        )}
      </div>

      <h2 className="appoinment-1">GET AN APPOINTMENT NOW</h2>
      <div className="talk">
        <Link className="talk-1" to="/contact">TALK TO US</Link>
        <svg className="talk-icon" width="" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z" fill="black"/>
        </svg>
      </div>

      <div className="self-journey">
        <p className="self-1">Embark on a self-expression journey at Tattoo Dreamers Studio...</p>
      </div>

      <div className="bg-white">
        <h1 className="home-talk">LET`S TALK TO US</h1>
        <p className="home-talk1">Nervous or excited? We’ve got you! Let’s talk and create the perfect tattoo for you.</p>

        <section id="offer-form" ref={formRef}>
          <div>
            {showMessage && <div className="message-box">{message}</div>}
            <div className="home-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name (Required)</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Your Email (Required)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Your Phone Number (Required)</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Do You Have a Design in Mind?</label>
                  <select name="designPreference" value={formData.designPreference} onChange={handleChange}>
                    <option value="">Please Choose an Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>When Would You Like to Get This Tattoo?</label>
                  <select name="appointmentDate" value={formData.appointmentDate} onChange={handleChange}>
                    <option value="">Please Choose an Option</option>
                    <option value="asap">As soon as possible</option>
                    <option value="weekend">This weekend</option>
                    <option value="specific-date">Specific date</option>
                  </select>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Submitting..." : "SUBMIT"}
                  </button>
                  <button 
                    type="button" 
                    className="payment-button" 
                    onClick={handlePaymentClick} 
                    disabled={loading}
                  >
                    Make Payment
                  </button>
                </div>
              </form>
            </div>
            {showPayment && (
              <Elements stripe={stripePromise}>
                <PaymentForm onClose={() => setShowPayment(false)} amount={paymentAmount} />
              </Elements>
            )}
          </div>
        </section>
      </div>

      {/* Footer section remains unchanged */}
      <div className='home-footer'>
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
          <p className="p1">A Wing 101, 1st Floor, Samadhan Tower by Asshna Developer...</p>
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
          <li><Link to="/" className="footer-route">Home</Link></li>
          <li>Academy</li>
          <li><Link to="/our-artist" className="footer-route">our Artist</Link></li>
          <li><Link to="/our-categories/small" className="footer-route">Our Categories</Link></li>
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
        <div className="row"></div>
      </div>
    </div>
  );
};

export default Home;