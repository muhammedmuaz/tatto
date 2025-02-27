import React, { useEffect, useRef, useState} from 'react';
import './contact.css';
import {  Link } from "react-router-dom";

const Contact = () => {
  const contactImgRef = useRef(null);
  const kiranRef = useRef(null);
  const contactFormContainerRef = useRef(null);
  const contactFooterRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Apply fade-in animation to elements that should appear immediately
    if (contactImgRef.current) {
      contactImgRef.current.classList.add('fade-in');
    }
    if (kiranRef.current) {
      kiranRef.current.classList.add('fade-in');
    }

    const handleScroll = () => {
      const sections = [
        { ref: contactFormContainerRef, className: 'enter-right' },
        { ref: contactFooterRef, className: 'enter-left' },
      ];

      sections.forEach(section => {
        if (section.ref.current) { // Null check before using ref
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
      // Fetch existing users to check for duplicate email
      const response = await fetch(" http://localhost:3000/users");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
      const users = await response.json();
      const existingUser = users.find(user => user.email === formData.email);

      if (existingUser) {
        setMessage("❌ This email is already in use. Please use a different email.");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        setLoading(false);
        return;
      }

      // Submit the form data
      const submitResponse = await fetch(" http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!submitResponse.ok) {
        const errorText = await submitResponse.text();
        throw new Error(`Error ${submitResponse.status}: ${errorText}`);
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

  return (
    <div>

     
      <div ref={contactImgRef}>
        <img className="contact-img" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738649242/g8e0eb7f9yvzv0brjds0.png" alt="Contact Image" />
      </div>
      <div className='kiran'>
        <h2 className='contact-text'>TATTOOS DREMERS STUDIO</h2>
        <p className='contact-text2'>Do you want a cool tattoo from a friendly and skilled team? Come to our Studio in Mumbai, where we can make any tattoo, you like. We care about your happiness and health, so we use the best ink and tools, and keep everything clean and safe. You can reach us by phone, email, or the form below. We can't wait to hear from you and give you an awesome tattoo!</p>
      </div>
      
      <h2 className='about'>GET IN TOUCH</h2>
      <p className="get-1">Ready to make your tattoo dreams a reality? Fill</p>
      <p className="get-2">out the form and let's make it happen!</p>
      <img className="map" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738740145/map_sedcwz.png" alt="Map" />

      <div ref={contactFormContainerRef}>
        {showMessage && (
          <div className="message-box">{message}</div>
        )}

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name (Required)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Email (Required)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Your Phone Number (Required)</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Do You Have a Design in Mind?</label>
              <select
                name="designPreference"
                value={formData.designPreference}
                onChange={handleChange}
              >
                <option value="">Please Choose an Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>When Would You Like to Get This Tattoo?</label>
              <select
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
              >
                <option value="">Please Choose an Option</option>
                <option value="asap">As soon as possible</option>
                <option value="weekend">This weekend</option>
                <option value="specific-date">Specific date</option>
              </select>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
  
      
      <div className='contact-footer'>
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
          <Link to="https://github.com/kiranchaudhary18"  target="_blank">
          <img className="icon-3" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1740680431/th_id_OIP_21_qktu4l.png" alt="Social Icon" />
          </Link>
        </div>

        <div className="circle-4">
        <Link to="https://x.com/home?lang=en-in"  target="_blank">
          <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738668/th_id_OIP_10_dsd5bt.png" alt="Social Icon" />
          </Link>
        </div>

        <div className="circle-5">
        <Link to="https://www.instagram.com/chaudhary_kiran_022/?next=%2F"  target="_blank">
          <img className="icon-2" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738738751/th_id_OIP_11_rzyiqj.png" alt="Social Icon" />
          </Link>
        </div>
        <div className="row"></div>
      </div>
    </div>
  );
};

export default Contact;