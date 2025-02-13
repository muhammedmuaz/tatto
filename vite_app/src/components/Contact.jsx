

import React, { useState } from 'react';
import "./contact.css"; // Make sure this file contains the CSS styles


const Contact = () => {

 const [formData, setFormData] = useState({
  name: '',
  email: '',
  mobile: '',
  design: '',
  appointment: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault(); // ✅ Prevents page refresh

  if (!formData.name || !formData.email || !formData.mobile) {
    console.log("Please fill in all required fields.");
    return;
  }

  try {
    const response = await fetch('https://tattoos-website-6.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Form submitted successfully:', data);

    // ✅ Reset the form fields after successful submission
    setFormData({
      name: '',
      email: '',
      mobile: '',
      design: '',
      appointment: ''
    });

  } catch (error) {
    console.error('Form submission error:', error.message);
  }
};
  return (
    <div>
    <div>
                <img className='contact' src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738649242/g8e0eb7f9yvzv0brjds0.png"/>
          </div>
                <div className='kiran'>
             <h2 className='contact-text'>TATTOOS DREMERS STUDIO  </h2>
             <p className='contact-text2'>Do you want a cool tattoo from a friendly and skilled team? Come to our Studio in Mumbai, where we can make any tattoo,
              you like. We care about your happiness and health, so we use the best ink and tools, and keep everything clean and safe. You can reach us by phone,
                email, or the form below. We can't wait to hear from you and give you an awesome tattoo!</p>
                </div>
        
                <h2 className='about'>
                  GET IN TOUCH
                </h2>

                <p className="get-1">Ready to make your tattoo dreams a reality? Fill</p>

                <p className="get-2">
                out the form and let's make it happen!</p>

                <img className="map" src="https://res.cloudinary.com/dnbayngfx/image/upload/v1738740145/map_sedcwz.png"/>

    <div className="contact-form-container">
      {/* <h2 className="contact-title">GET IN TOUCH</h2> */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="your">Your Name (Required)</label>
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
          <select name="design" value={formData.design} onChange={handleChange}>
            <option value="">Please Choose an Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>When Would You Like to Get This Tattoo?</label>
          <select name="appointment" value={formData.appointment} onChange={handleChange}>
            <option value="">Please Choose an Option</option>
            <option value="asap">As soon as possible</option>
            <option value="weekend">This weekend</option>
            <option value="specific-date">Specific date</option>
          </select>
        </div>
        <button type="submit" className="submit-button">SUBMIT</button>
      </form>
    </div>

    <div className='contact-footer'>
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
  );
}

export default Contact;



