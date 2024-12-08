import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AboutContent.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component
import logo1 from "../img/surplus.jpg";
import logo2 from "../img/happy_community.jpg";
import logo3 from "../img/sharing.png";

const AboutContent = () => {
  const navigate = useNavigate();
  const learn = () => {
    navigate("/learnmore");
  };

  return (
    <div className="pongada">
      {/* Add Navbar at the top */}
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <div className="full">
        {/* About Us Section */}
        <section className="aboutus bg-white p-1 mt-5 sm-12">
          <div className="aboutus-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 my-3 sm-2 px-2">
                  <div className="HungerTreat-image slideIn">
                    <img src={logo1} alt="food" />
                  </div>
                </div>
                <div className="col-lg-6 mb-4 sm-2">
                  <div className="mission p-1 mb-4 sm-2">
                    <h2 className="mt-5 fw-bold">Welcome to HungerTreat!</h2>
                    <p className="para1 pt-1 mb-4 sm-2">
                      Every year, millions of tons of perfectly good food go to
                      waste while many people go hungry. That's where
                      HungerTreat comes in. We work to connect businesses with
                      excess food to those who are in need. Whether you have
                      surplus food from catering events or unsold items from
                      your restaurant, we help to get that food to people who
                      can use it. Join us in the fight against food waste and
                      hunger.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="aboutus2 bg-white">
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-6 order-lg-2 mb-4">
                <div className="hand-image slideIn ps-2 pt-3">
                  <img src={logo2} alt="connecting" />
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="ourmission">
                  <h1 className="fs-1 py-3 fw-bold">
                    Sharing is caring: Our Mission
                  </h1>
                  <p className="para2">
                    HungerTreat is your source for surplus food sharing. Our
                    platform allows food donors to connect with those in need,
                    making it easy to make a difference. By sharing your excess
                    food, you can help us fight waste and promote social
                    responsibility. Make a positive impact on your community
                    today! We believe that everyone should have access to fresh,
                    affordable food, and we are achieving this mission by
                    facilitating a food-sharing community that is easy and
                    accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="aboutus3 bg-white">
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="add-image slideIn pt-3">
                  <img src={logo3} alt="benefit" />
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="benefit">
                  <h1 className="fw-bold py-2">Food Rescue</h1>
                  <p className="para3">
                    The community served by the "HungerTreat" website receives
                    surplus food through a dedicated effort to combat food waste
                    and hunger. The community benefits from equitable access to
                    rescued surplus food, which not only reduces food waste but
                    also provides essential nutrition to those in need. Through
                    efficient logistics and partnerships, "HungerTreat" ensures
                    that perfectly edible surplus food reaches communities,
                    contributing to environmental sustainability and addressing
                    the pressing issue of food insecurity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works text-grey">
          <div className="container text-center">
            <h1>How it works</h1>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="column">
                  <h3>Donations</h3>
                  <hr className="my-2" />
                  <p>Restaurants and wedding venues contribute surplus food.</p>
                  <p>
                    Volunteers collect and deliver the food to selected homes
                    and orphanages.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="column">
                  <h3>Connecting</h3>
                  <hr className="my-2" />
                  <p>
                    We ensure the surplus food matches the specific needs and
                    dietary requirements.
                  </p>
                  <p>
                    Verified recipients receive the food to reduce food waste
                    and help those in need.
                  </p>
                </div>
              </div>
            </div>
            <button className="cta-button" onClick={learn}>
              Learn More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutContent;
