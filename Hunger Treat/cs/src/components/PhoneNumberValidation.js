import React, { useEffect, useState } from "react";


const PhoneNumberValidation = ({ phoneNumber, onChange }) => {
  const [error, setError] = useState("");

  // Regular expression for a 10-digit phone number validation
  // const phoneNumberRegex = /^[0-9]{10}$/;
  const phoneNumberRegex = /^[6-9][0-9]{9}$/;

  useEffect(() => {
    
    
    // Validate phone number
    if (phoneNumberRegex.test(phoneNumber)) {
      setError("");
    } else {
      setError("Phone number is invalid.");
    }
  }, [phoneNumber]);
  

  return (
    <div>
      {/* <input
          type="text"
          value={phoneNumber}
          onChange={onChange}
          placeholder="Enter your Phone Number"
          required
     /> */}

      <input
        type="text"
        className="form-control"
        placeholder="Enter your mobile no."
        value={phoneNumber}
        onChange={(e) => onChange(e.target.value)}
        required
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );




};

export default PhoneNumberValidation;
