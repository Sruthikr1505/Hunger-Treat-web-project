// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isChecked, setIsChecked] = useState(false);
// console.log("1st time : ", isChecked);
// const handleToggle = () => {
//   const newCheckedState = !isChecked; // Determine the new state
//   setIsChecked(newCheckedState); // Update the state

//   // Delayed navigation based on the new state
//   setTimeout(() => {
//     if (newCheckedState) {
//       console.log("signup");
//       // navigate("/signup"); // If unchecked, go to sign up
//     } else {
//       console.log("login");
//       // navigate("/login"); // If checked, go to login
//     }
//   }, 300); // Adjust delay for better UX (matches animation)
// };

//   return (
//     <nav className="navbar p-1">
//       <div className="heading m-2 col-sm-2">
//         <h1 className="m-2 pe-5 col-sm-6 text-white fw-bold ">HungerTreat!!</h1>
//       </div>
//       <div className="navbar-left d-flex justify-content-end mx-5">
//         {/* Toggle Switch */}
//         <div className="fx-block">
//           <div className="toggle">
//             <div>
//               <input
//                 type="checkbox"
//                 id="toggles"
//                 checked={isChecked}
//                 onChange={handleToggle} // Handles the toggle behavior
//               />
//               <div data-unchecked="Sign Up" data-checked="Log"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar p-1">
      <div className="heading m-2 col-sm-2">
        <h1 className="m-2 pe-5 col-sm-6 text-white fw-bold ">HungerTreat!!</h1>
      </div>
      <div className="navbar-left d-flex justify-content-end mx-5">
        {/* Navigation Links */}
        <div className="fx-block d-flex">
          <div
            className="toggle-option mx-3 text-white fw-bold"
            onClick={() => handleNavigate("/signup")}
          >
            Sign Up
          </div>
          <div
            className="toggle-option mx-3 text-white fw-bold"
            onClick={() => handleNavigate("/login")}
          >
            Login
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
