import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  initializeGoogleSignIn,
  renderGoogleButton,
  handleGoogleSignInResponse,
} from "./GoogleSignIn";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { auth } from "../components/Firebase";
import axios from "axios";
import "../styles/SignIn.css";
import logo from "../img/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const navigate = useNavigate();
  const about = () => {
    navigate("/login");
  };

  useEffect(() => {
    initializeGoogleSignIn(async (response) => {
      handleGoogleSignInResponse(response);
      const email = jwtDecode(response.credential).email;

      try {
        const res = await axios.post(
          "https://hungertreat.onrender.com/api/saveUserData",
          {
            email,
          }
        );
        alert(res.data.message);
        setTimeout(() => {
          navigate("/sere");
        }, 2000);
      } catch (error) {
        alert("Error saving data");
      }
    });
    renderGoogleButton();
  }, []);

  const checkIfGoogleAccount = async (email) => {
    try {
      const response = await axios.post(
        "https://hungertreat.onrender.com/api/checkGoogleAccount",
        { email }
      );
      if (response.data.isGoogleAccount) {
        setIsGoogleAccount(true);
        alert(
          "This email is associated with a Google account. Please use Google Sign-In."
        );
      } else {
        setIsGoogleAccount(false);
      }
    } catch (error) {
      console.error("Error checking Google account:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isGoogleAccount) {
      alert("Please use Google Sign-In for this email.");
      return;
    }

    if (email && password) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        const newUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendEmailVerification(newUser.user);
        alert("Verification email sent. Please check your inbox.");

        const verificationTimeout = setTimeout(async () => {
          const user = auth.currentUser;
          await user.reload();
          if (!user.emailVerified) {
            await deleteUser(user);
            alert("Verification failed: User deleted after 3 minutes.");
          }
        }, 180000);

        const intervalId = setInterval(async () => {
          const user = auth.currentUser;
          if (user) {
            await user.reload();
            if (user.emailVerified) {
              clearInterval(intervalId);
              clearTimeout(verificationTimeout);
              setVerificationStatus(true);

              await axios.post(
                "https://hungertreat.onrender.com/api/saveUserData",
                {
                  email,
                  password,
                }
              );

              alert("Email verified. Redirecting...");
              setTimeout(() => {
                navigate("/sere");
              }, 2000);
            }
          }
        }, 3000);
      } catch (error) {
        alert("Error during sign-up: " + error.message);
      }
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container col-lg-6 col-md-8 col-11 mx-auto">
        <div className="form-container-sign container">
          <div className="row">
            <div className="for-img-sign col-md-6 d-flex justify-content-center">
              <img
                src={logo}
                alt="Food App Logo"
                className="logo-sign img-fluid"
              />
            </div>
            <div className="sign-content col-md-6 col-12">
              <h2 className="text-center mb-4 sign">Sign-Up to HungerTreat</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      checkIfGoogleAccount(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group password-group col-sm-12">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Create a new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isGoogleAccount}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isGoogleAccount}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>

                <div className="form-group password-group col-sm-12">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>

                <button type="submit" className="sign-btn btn-block but2">
                  Sign Up
                </button>
              </form>
              <div className="last text-center mt-3">
                <p>
                  Already have an account?{" "}
                  <button className="go-but" onClick={about}>
                    Login
                  </button>
                </p>
              </div>

              <hr className="my-4" />
              <div id="signInDiv" className="goo d-flex justify-content-center">
                Continue with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
