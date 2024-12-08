import React, { useState, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import "jquery-ui/themes/base/all.css";
import "../styles/DonateForm.css";
import { useNavigate } from "react-router-dom";
// import PhoneNumberValidation from "./PhoneNumberValidation";
import logo from "../img/logo.png";

const DonateForm = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  const [foodType, setFoodType] = useState("");
  const [foodItems, setFoodItems] = useState([{ foodName: "", quantity: "" }]);
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [donorDetails, setDonorDetails] = useState(null);

  useEffect(() => {

    const availableFoods = [
      "Aapam",
      "Banana",
      "Bread",
      "Broccoli",
      "Carrot",
      "Chicken",
    ];

    flatpickr("#prepTime", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "h:i K",
      minuteIncrement: 1,
      onOpen: (selectedDates, datestr, instance) => {
        if (!instance.selectedDates.length) {
          instance.setDate(new Date());
        }
      },
    });

    foodItems.forEach((_, index) => {
      const selector = `#foodName${index}`;
      $(selector).autocomplete({
        source: availableFoods,
        select: (event, ui) => {
          handleFoodNameChange(index, ui.item.value); // Update the React state when an item is selected from the dropdown
        },
      });
    });

  }, [foodItems]);

  const handleOrgNameChange = async (e) => {
    const orgName = e.target.value;
    setOrganization(orgName);

    if (orgName.length > 2) {
      try {
        const response = await fetch(
          `https://hungertreat.onrender.com/api/donors/${orgName}`
        );
        console.log(orgName,response);
        if (response.ok) {
          console.log("obtained the data");
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error(
              "Expected JSON, but received a different content-type"
            );
          }

          const textData = await response.text();
          console.log("Raw response body:", textData);

          // Try to parse the JSON after inspecting the raw response
          const data = JSON.parse(textData);
          console.log("Parsed data:", data);
          // const data = await response.json();
          // console.log(data);
          setDonorDetails(data); // Update form fields based on the response
          setLocation(data.location); // Autofill location
          setContact(data.phone); // Autofill phone number
          console.log("inserted properly");
        } else {
          console.log("Organization not found");
        }
      } catch (error) {
        console.error("Error fetching organization details:", error);
      }
    }
  };

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  }

  const handleAddFoodItem = () => {
    setFoodItems([...foodItems, { foodName: "", quantity: "" }]);
  };

  const handleRemoveFoodItem = (index) => {
    const newFoodItems = [...foodItems];
    newFoodItems.splice(index, 1);
    setFoodItems(newFoodItems);
  };

  const handleFoodNameChange = (index, value) => {
    const newFoodItems = [...foodItems];
    newFoodItems[index].foodName = value;
    setFoodItems(newFoodItems);
  };

  const handleQuantityChange = (index, value) => {
    const newFoodItems = [...foodItems];
    newFoodItems[index].quantity = Number(value);
    setFoodItems(newFoodItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orgName = organization;
    const prepTime = document.getElementById("prepTime").value;
    // const dateTime = new Date().toLocaleString();
    const dateTime = new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // India generally uses 12-hour format with AM/PM
      timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
    }).format(new Date());

    console.log(dateTime);

    const notes = document.getElementById("notes").value;

    const postDetails = {
      foodItems,
      foodType,
      orgName,
      prepTime,
      location,
      dateTime,
      contact,
      notes
    };

    console.log(postDetails);

    try {
      const response = await fetch("https://hungertreat.onrender.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetails),
      });
      if (response.ok) {
        navigate("/postdetails");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <div className="donform">
      <div className="container-donform">
        {/* <h3 className="mt-5">HungerTreat - Donate Surplus Food</h3> */}
        <div className="header-donform">
          <img
            className="logo-donform"
            src={logo}
            alt="HungerTreat Logo"
            style={{ width: "300px" }}
          />
          <h1>HungerTreat</h1>
          <p>
            Join us in making a difference by donating surplus food to those in
            need
          </p>
        </div>
        <form className="donation-form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="foodType">
              <i class="fas fa-hamburger"></i> Food Type
            </label>
            <select
              id="foodType"
              name="foodType"
              value={foodType}
              onChange={handleFoodTypeChange}
              required
            >
              <option value="">Select food type</option>
              <option value="Cooked Food">Cooked Food</option>
              <option value="Packaged Food">Packaged Food</option>
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Baked Goods">Baked Goods</option>
            </select>
          </div>

          <div id="foodNameContainer" className="form-group">
            <label>
              <i class="fas fa-weight"></i>Food Items and Quantities
            </label>
            {foodItems.map((item, index) => (
              <div className="food-input-container" key={index}>
                <input
                  type="text"
                  // className="form-control foodName"
                  id={`foodName${index}`}
                  placeholder="Enter food name"
                  value={item.foodName}
                  onChange={(e) => handleFoodNameChange(index, e.target.value)}
                  required
                />
                <input
                  type="number"
                  // className="form-control foodQuantity"
                  placeholder="Enter quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  required
                  min="1"
                />
                {index > 0 && (
                  <span
                    className="remove-food"
                    onClick={() => handleRemoveFoodItem(index)}
                  >
                    &times;
                  </span>
                )}
              </div>
            ))}
            <br />
            <button
              type="button"
              className="button-addon"
              onClick={handleAddFoodItem}
            >
              Add Food Item
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="prepTime">
              <i class="fas fa-calendar"></i>Preparation Time
            </label>
            <input
              type="text"
              className="form-control"
              id="prepTime"
              placeholder="Enter preparation time"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="orgName">
              <i class="fas fa-store"></i>Organization Name
            </label>
            <input
              type="text"
              className="form-control"
              id="orgName"
              placeholder="Enter organization name"
              onChange={handleOrgNameChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <i class="fas fa-map-marker-alt"></i>Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div class="form-group full-width">
            <label for="notes">
              <i class="fas fa-sticky-note"></i> Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              placeholder="Any special instructions or notes"
            ></textarea>
          </div>

          {/* <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <PhoneNumberValidation value={contact} onChange={setContact} />
        </div> */}

          <button type="submit" className="submit-donate">
            Post
          </button>
          <br/>
          <br/>
          <div
            className="toggle-option mx-3 text-black fw-bold"
            onClick={() => handleNavigate("/postdetails")}
          >
            Back To Post Page
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
