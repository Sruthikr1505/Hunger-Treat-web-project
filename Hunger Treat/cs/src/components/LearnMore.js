import React from "react";
import '../styles/LearnMore.css';
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import logo from "../img/logo.png";

const LearnMore = () => {

    const navigate = useNavigate(); // Initialize the navigate function
  


  return (
    <div className="learn-full">
      <header className="head-learn">
        <h1
          className="animated-heading"
          // Redirect to AboutContent.js
          style={{ cursor: "pointer" }}
        >
          HungerTreat
        </h1>
        <p>Fighting Food Waste, Feeding Hope</p>

        <div className="logo-container-learn">
          <img
            src={logo}
            onClick={() => navigate("/signup-content")}
            alt="HungerTreat Logo"
          />
        </div>
      </header>

      <main>
        <section>
          <h2 className="st">Making a Difference Together</h2>
          <p>
            Welcome to HungerTreat! We're on a mission to create a sustainable
            solution to food waste and hunger in our communities.
          </p>
        </section>

        <div className="stats-container">
          <div className="stat-card">
            <i
              className="fas fa-hand-holding-heart fa-2x"
              style={{ color: "var(--primary-color)" }}
            ></i>
            <div className="stat-number">Online Donations</div>
            <p>Easily contribute surplus food!</p>
          </div>
          <div className="stat-card">
            <i
              className="fas fa-users fa-2x"
              style={{ color: "var(--primary-color)" }}
            ></i>
            <div className="stat-number">Community Impact</div>
            <p>Connecting Donors those who in need!</p>
          </div>
          <div className="stat-card">
            <i
              className="fas fa-recycle fa-2x"
              style={{ color: "var(--primary-color)" }}
            ></i>
            <div className="stat-number">Food Recycling!</div>
            <p>Turning Waste into Resourses!</p>
          </div>
        </div>

        <section className="info-section">
          <h2 className="st">
            <i className="fas fa-donate"></i> Donating Surplus Food
          </h2>
          <div className="info-box">
            <p className="box-up">
              Are you a restaurant, grocery store, or food business with surplus
              food? Join our network of generous donors and make zero hunger
              everywhere
            </p>
            <ul>
              <li>Direct connections with local recipient organizations</li>
              <li>
                Looking to directly connect with orphanages, shelters, and other
                food pantries? HungerTreat allows you to browse a network of
                registered recipients in your area. Simply contact them to
                arrange a convenient pick-up time for your surplus food
                donations.
              </li>
              <li>
                Let HungerTreat handle the logistics! Soon, you'll be able to
                request a pick-up, and our trained volunteers will safely
                deliver your surplus food to the right recipient based on
                location and needs.
              </li>
            </ul>
            <a href="#" className="cta-button-learn">
              Become a Donor
            </a>
          </div>
        </section>

        <section className="info-section">
          <h2 className="st">
            <i className="fas fa-hand-holding-heart"></i> Receiving Food
            Donations
          </h2>
          <div className="info-box">
            <p className="box-up">
              HungerTreat connects eligible organizations with quality food
              donations to support their communities:
            </p>
            <ul>
              <li>Regular updates on available donations</li>
              <li>
                HungerTreat supports your fight against hunger by connecting
                registered organizations with food donations from partnering
                businesses. Bring your own vessel for collection, and soon we’ll
                introduce an option for facilitated deliveries.
              </li>
              <li>
                Share your location, pick-up hours, and any dietary restrictions
                you cater to. Our system will match you with suitable food
                donations from nearby businesses, ensuring you receive the right
                resources. Register with HungerTreat to access a reliable source
                of nutritious food for your community.
              </li>
            </ul>
            <a href="#" className="cta-button-learn">
              Register as Recipient
            </a>
          </div>
        </section>

        <section className="info-section">
          <h2 className="st">
            <i className="fas fa-users"></i> Get Involved
          </h2>
          <div className="info-box">
            <ul>
              <li>
                Become a Food Donor: Help reduce waste and feed those in need
              </li>
              <li>
                Volunteer Opportunities: Join our upcoming volunteer network
              </li>
              <li>Register as Recipient: Connect with local food donors</li>
              <li>Spread the Word: Share our mission with others</li>
            </ul>
            <a href="#" className="cta-button-learn">
              Join Our Mission
            </a>
          </div>
        </section>

        <h3 className="animated-text">
          Together, we can create a future where no one goes hungry!
        </h3>
      </main>
    </div>
  );
};

export default LearnMore;
