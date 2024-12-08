// WhatsAppForm.js
import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import '../styles/WhatsApp.css';
import { useNavigate } from "react-router-dom";
const WhatsAppForm = () => {
  const { phoneNumber } = useParams(); // Get phone number from route params
  const [message, setMessage] = React.useState(
    "We need your food \nOur address : "
  );
  const navigate = useNavigate();
  const about = () => {
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="full1">
      <div className="form-container-for">
        <h1 className="write">Send a Message to Donor !</h1>
        <p>
          Reach out to food donors directly via WhatsApp and make a difference
          together
        </p>
        <form id="whatsappForm" onSubmit={handleSubmit}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" value={phoneNumber} readOnly />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button className="wp" type="submit">
            Send to WhatsApp
          </button>
        </form>
        <br />
        <button className="go-but" onClick={about}>
          Back to Post Page
        </button>
      </div>
    </div>
  );
};

export default WhatsAppForm;
