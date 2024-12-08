import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FoodDonorForm.css";
import "../styles/SpinnerLoader.css"; // Import the loader CSS

export default function SPLoader({ nextRoute }) {
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      if (nextRoute) {
        navigate(nextRoute);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, nextRoute]);

  return (
    <div className="container-spin">
      {" "}
      {/* Centering container */}
      <div className="hand">
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="palm"></div>
        <div className="thumb"></div>
        <h2 className="loading-message col-12 sm-12">
          Almost there! Just a few more seconds...
        </h2>
      </div>
    </div>
  );
}
