import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/FoodDonorForm.css"; 

import PhoneNumberValidation from "./PhoneNumberValidation"; 

const FoodDonorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    orgName: "",
    location: "",
    phone: "",
    email: "",
    acknowledgeResponsibility: false,
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const navigate = useNavigate();

  const TAMILNADU_BBOX = "76.2301,8.0677,80.2707,13.4963";

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "location") {
      debounceFetchLocations(value);
    }
  };

  const debounceFetchLocations = useRef(
    debounce((query) => {
      if (query.length > 2) fetchLocations(query);
      else setLocationSuggestions([]);
    }, 300)
  ).current;

  const fetchLocations = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=in&viewbox=${TAMILNADU_BBOX}&bounded=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const tamilNaduResults = data.filter(
        (item) =>
          item.display_name.toLowerCase().includes("tamil nadu") ||
          item.display_name.toLowerCase().includes("tamilnadu")
      );
      setLocationSuggestions(tamilNaduResults);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevState) => ({
      ...prevState,
      location: suggestion.display_name,
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    // navigate("/postdetails");
    e.preventDefault();
    console.log("Form data before submission:", formData);

    try {
      const response = await axios.post(
        "https://hungertreat.onrender.com/api/receivers",
        formData
      );
      console.log("Server response:", response.data);
      alert(response.data.message);
      navigate("/postdetails"); // Redirect using React Router
      console.log("Navigation to /postdetails initiated");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg">
      <div className="form-container ">
        <form className="donor-reg " onSubmit={handleSubmit}>
          <h2 className="don-form text-center fw-bold">
            Food Receiver Registration Form
          </h2>
          <br />
          <div className="donor-det mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-input"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter Your Name"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="donor-det mb-3">
            <label htmlFor="orgName" className="form-label">
              Organization Name
            </label>
            <input
              type="text"
              className="form-control rounded-input"
              id="orgName"
              name="orgName"
              value={formData.orgName}
              onChange={handleInputChange}
              placeholder="Enter organization name"
              required
            />
          </div>

          <div className="donor-det mb-3 position-relative">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control rounded-input"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="Enter a location "
            />
            {showSuggestions && (
              <ul
                className="list-group position-absolute w-100"
                ref={suggestionRef}
              >
                {locationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="donor-det mb-3">
            <label htmlFor="phone" className="form-label">
              Whatsapp Number only
            </label>
            {/* <input
              type="tel"
              className="form-control rounded-input"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            /> */}
            <PhoneNumberValidation
              phoneNumber={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
            />
          </div>

          <div className="donor-det mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-input"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter Email Address"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="donor-det mb-3">
            <div className="alert alert-warning" role="alert">
              <strong>For Receivers :</strong> Receivers are responsible for the
              transport and carriers..
            </div>
          </div>

          <div className="donor-det mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="acknowledgeResponsibility"
              name="acknowledgeResponsibility"
              checked={formData.acknowledgeResponsibility}
              onChange={handleInputChange}
              required
            />
            <label
              className="form-check-label"
              htmlFor="acknowledgeResponsibility"
            >
              I acknowledge and accept the responsibility statement above.
            </label>
          </div>

          <button
            type="submit"
            className="reg-button text-black"
            disabled={!formData.acknowledgeResponsibility}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default FoodDonorForm;
