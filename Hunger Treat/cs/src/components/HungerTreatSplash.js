import React, { useEffect } from 'react';
import jQuery from 'jquery';
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png"
import 'jquery.ripples';
import "../styles/Splash.css"


const HungerTreatLanding = () => {
  const navigate = useNavigate();
  const about = () => {
    navigate("/about-content");
  };
  useEffect(() => {
    // jQuery ripple effect
    jQuery('header').ripples({
      dropRadius: 30,
      perturbance: 0.03
    });
  }, []);

  return (
    <div className="splash-container">
    <header className="header-splash">
      <div className="container-splash">
        <div className="logo-splash">
          <img alt="Logo" src={logo} />
        </div><br/>
        <br/>
        <div className="content">
          <h1 className='front-ht'>HungerTreat</h1>
          <p className='front-sub'>"Bridging the Gap Between Food Waste and Food Insecurity: A Holistic Approach to Community Wellness"</p>
          <button className="splash-but" onClick={about}>Next → </button>
        </div>
      </div>
    </header>
    </div>
  );
};

export default HungerTreatLanding;