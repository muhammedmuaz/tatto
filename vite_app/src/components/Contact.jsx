import React, { useEffect, useRef, useState } from 'react';
import './contact.css';
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QREzbGzvn2xju5ejFTJzqm2HX3RZiyDBbbxT8EIVB568UB72NlPYlMb8yYhekEnP0ChNpzbWzh4lz1oGhA7iLo000G3mPnGlv');

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
        body: JSON.stringify({ amount: amount * 100 }),
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
        <h3 className='head'>Enter Your Card Details to Make Payment</h3>
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

const Contact = () => {
  const contactImgRef = useRef(null);
  const kiranRef = useRef(null);
  const contactFormContainerRef = useRef(null);
  const contactFooterRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", designPreference: "", appointmentDate: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount] = useState(50);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contactImgRef.current) contactImgRef.current.classList.add('fade-in');
    if (kiranRef.current) kiranRef.current.classList.add('fade-in');

    const handleScroll = () => {
      const sections = [
        { ref: contactFormContainerRef, className: 'enter-right' },
        { ref: contactFooterRef, className: 'enter-left' },
      ];
      sections.forEach(section => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.ref.current.classList.add(section.className);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) throw new Error(`Error ${response.status}: ${await response.text()}`);
      const users = await response.json();
      if (users.find(user => user.email === formData.email)) {
        setMessage("❌ This email is already in use. Please use a different email.");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        setLoading(false);
        return;
      }

      const submitResponse = await fetch("https://tattoos-website-9-login.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!submitResponse.ok) throw new Error(`Error ${submitResponse.status}: ${await submitResponse.text()}`);
      setMessage("✅ Form submitted successfully!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      setFormData({ name: "", email: "", mobile: "", designPreference: "", appointmentDate: "" });
    } catch (error) {
      console.error("Form submission error:", error.message);
      setMessage("❌ Submission failed. Please try again.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = () => setShowPayment(true);

  return (
    <div>
      <div ref={contactImgRef}>
        <img className="contact-img" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738649242/g8e0eb7f9yvzv0brjds0.png" alt="Contact Image" />
      </div>
      <div className='kiran' ref={kiranRef}>
        <h2 className='contact-text'>TATTOOS DREMERS STUDIO</h2>
        <p className='contact-text2'>Do you want a cool tattoo from a friendly and skilled team? Come to our Studio in Mumbai...</p>
      </div>
      <h2 className='about'>GET IN TOUCH</h2>
      <p className="get-1">Ready to make your tattoo dreams a reality? Fill</p>
      <p className="get-2">out the form and let's make it happen!</p>
      <img className="map" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738740145/map_sedcwz.png" alt="Map" />

      <div ref={contactFormContainerRef}>
        {showMessage && <div className="message-box">{message}</div>}
        <div className="contact-form-container">
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
              <button type="button" className="payment-button" onClick={handlePaymentClick} disabled={loading}>
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
      <div className='contact-footer'>
        {/* Your footer content */}
      </div>
    </div>
  );
};

export default Contact;