import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    design: "",
    appointment: "",
  });

  // State for user data from API
  const [users, setUsers] = useState([]);

  // Fetch existing users from API (GET Request)
  useEffect(() => {
    axios
      .get("https://tattoos-website-4.onrender.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (POST Request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post("https://tattoos-website-4.onrender.com/users", formData);
      console.log("User added:", response.data);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", design: "", appointment: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed!");
    }
  };

  return (
    <div className="form-container">
      <h1>Book Your Tattoo Appointment</h1>

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <label>Your Name (Required)</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        {/* Email Input */}
        <label className="email">Your Email (Required)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        {/* Phone Number Input */}
        <label>Your Phone Number (Required)</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />

        {/* Design Selection */}
        <label>Do you have a design in mind?</label>
        <select name="design" value={formData.design} onChange={handleChange}>
          <option value="">Please choose an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Need Suggestions">Need Suggestions</option>
        </select>

        {/* Appointment Selection */}
        <label>When would you like to get this tattoo?</label>
        <select name="appointment" value={formData.appointment} onChange={handleChange}>
          <option value="">Please choose an option</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Later">Later</option>
        </select>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Display Users from API */}
      {users.length > 0 && (
        <div className="users-list">
          <h3>Previous Submissions</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} - {user.email} - {user.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
