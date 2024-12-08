import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DonateFood from "./components/DonateFood";
import FoodDonorForm from "./components/FoodDonorForm";
import FoodReceiverForm from "./components/FoodReceiverForm";
import Login from "./components/Login";
import PostDetails from "./components/PostDetails";
import SeRe from "./components/SeRe";
import SignIn from "./components/SignIn";
import AboutContent from "./components/AboutContent";
import SPLoader from "./components/SpinnerLoader";
import WhatsAppForm from "./components/WhatsAppForm";
import HungerTreatSplash from "./components/HungerTreatSplash";
import LearnMore from "./components/LearnMore";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HungerTreatSplash />} />
          
          <Route
            path="/signup"
            element={<SPLoader nextRoute="/signup-content" />}
          />
          <Route path="/signup-content" element={<SignIn />} />

          <Route
            path="/login"
            element={<SPLoader nextRoute="/login-content" />}
          />
          <Route path="/login-content" element={<Login />} />

          <Route path="/learnmore" element={<LearnMore />} />

          <Route
            path="/about"
            element={<SPLoader nextRoute="/about-content" />}
          />
          <Route path="/about-content" element={<AboutContent />} />

          <Route
            path="/postdetails"
            element={<SPLoader nextRoute="/postdetails-content" />}
          />
          <Route path="/postdetails-content" element={<PostDetails />} />

          <Route path="/whatsapp/:phoneNumber" element={<WhatsAppForm />} />

          <Route
            path="/donatefood"
            element={<SPLoader nextRoute="/donatefood-content" />}
          />
          <Route path="/donatefood-content" element={<DonateFood />} />

          <Route
            path="/sere"
            element={<SPLoader nextRoute="/sere-content" />}
          />
          <Route path="/sere-content" element={<SeRe />} />

          <Route
            path="/donor"
            element={<SPLoader nextRoute="/donor-content" />}
          />
          <Route path="/donor-content" element={<FoodDonorForm />} />

          <Route
            path="/receiver"
            element={<SPLoader nextRoute="/receiver-content" />}
          />
          <Route path="/receiver-content" element={<FoodReceiverForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
