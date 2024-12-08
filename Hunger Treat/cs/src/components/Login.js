import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  initializeGoogleSignIn,
  renderGoogleButton,
} from "./GoogleSignIn";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/LogIn.css";
import logo from "../img/logo.png"; // Assuming the logo is stored in the img folder

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [googleToken, setGoogleToken] = useState(""); 
  // Save Google Token after sign-in
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate();
  //  const navigate = useNavigate();
   const about = () => {
     navigate("/signup");
   }; // Hook to programmatically navigate after login

  useEffect(() => {
    // Initialize Google Sign-In and set up the button
    initializeGoogleSignIn(async (response) => {
      console.log("happy if response : ", response);
      const googleToken = response.credential;
      // console.log("token : ", token); // Get Google JWT token
      // setGoogleToken(token); // Save the token to the state
      console.log("Google token received:", googleToken);

       try {
        const res = axios.post(
          "https://hungertreat.onrender.com/api/checkUserPassword",
          {
            googleToken, // Send Google token to backend for verification
          },
          {
            headers: {
              "Content-Type": "application/json", // Set proper content type
            },
          }
        );

        console.log("Response from backend (Google):", res);
        console.log("success status : ",(await res).data.success);

        if ((await res).data.success ) {
          // alert(res.data.message);
          navigate("/postdetails"); // Navigate after successful login
        } else {
          alert(res.data.message);
        }


      } catch (error) {
        console.error("Error verifying Google sign-in:", error);
        alert("Error verifying Google sign-in.");
      }
    });
    renderGoogleButton();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;

     if (email && password) {
        // User logging in via email and password
        console.log("Sending email/password login request:", {
          email,
          password,
        });
        response = await axios.post(
          "https://hungertreat.onrender.com/api/checkUserPassword",
          {
            email,
            password,
          }
        );
      } else {
        alert("Please enter both email and password.");
        return;
      }

      console.log("Response from backend:", response);

      // Handle successful login
      if (response.data.success) {
        alert(response.data.message);
        setTimeout(() => {
          navigate("/postdetails"); // Navigate to postdetails on successful login
        }, 2000);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying credentials:", error);
      alert("Error verifying credentials.");
    }
  };

  return (
    <div className="log-in-page">
      <div className="login-container col-lg-6 col-md-8 col-11 mx-auto">
        <div className="form-container-log container ">
          <div className="row">
            <div className="for-img-log col-md-6 d-flex justify-content-center">
              <img src={logo} alt="Logo" className="logo-log img-fluid" />
            </div>
            <div className="log-content col-md-6 col-12">
              <h2 className="name-log text-center mb-4 log-in">
                Login to HungerTreat
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group password-group mb-3">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon"
                      />
                    </button>
                  </div>
                </div>
                {/* <div className="form-group text-right col-sm-12">
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div> */}

                <button type="submit" className="login-btn btn-block but3">
                  Login
                </button>
              </form>
              <div className="last text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <button className="go-but" onClick={about}>
                    Sign Up
                  </button>
                </p>
              </div>
              <hr className="my-4" />
              <div
                id="signInDiv"
                className="goo1 d-flex justify-content-center"
              >
                Continue with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
