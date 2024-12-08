import React, { useEffect, useState } from "react";
import "../styles/PostDetails.css";
import { useNavigate } from "react-router-dom"; 

const PostDetails = () => {
  const [posts, setPosts] = useState([]);
  const [unavailablePosts, setUnavailablePosts] = useState([]);
  
  const navigate = useNavigate(); 
  //  const navigate = useNavigate();
   const about = () => {
     navigate("/donatefood");
   };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://hungertreat.onrender.com/posts");
        if (response.ok) {
          let posts = await response.json();
          posts = posts.sort(
            (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
          );
          setPosts(posts);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  const convertPrepTimeToLocaleString = (prepTime, date) => {
    // Get today's date
    console.log(date);
    const today = new Date(date);
    console.log(today);

    // Use a regular expression to match the hour, minutes, and AM/PM part
    const timePattern = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
    const match = prepTime.match(timePattern);

    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();

      // Convert 12 AM or PM format to 24-hour format
      if (ampm === "PM" && hours < 12) {
        hours += 12;
      } else if (ampm === "AM" && hours === 12) {
        hours = 0;
      }

      // Set the hours and minutes to the date object (keeping the date part as today)
      today.setHours(hours, minutes, 0, 0);

      // Convert the full date and time to a localized string
      return today;
    } else {
      console.error("Invalid prepTime format");
      return null;
    }
  };


  useEffect(() => {
    const intervalIds = [];

    const checkAvailability = (post, index) => {
      console.log(post);
      console.log("hello shobi checking......",post.prepTime,"\n",post.dateTime);
      const today = new Date(post.dateTime);
      console.log("today is ",today);
      const postTime = convertPrepTimeToLocaleString(
        post.prepTime,
        post.dateTime
      );
      // const postTime = new Date(post.prepTime);
      const twoMinutesInMillis = 1 * 60 * 60 * 1000;
      const twelveHoursInMillis = 12 * 60  * 60 * 1000;


      const intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - postTime.getTime();
        console.log(postTime, currentTime, timeDifference);

        if (timeDifference >= twelveHoursInMillis) {
          // Remove the post from the state if expired
          setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
          clearInterval(intervalId);
        } else if (timeDifference >= twoMinutesInMillis) {
          // Mark the post as unavailable after 2 minutes
          setUnavailablePosts((prevState) => [...prevState, index]);
        }
      }, 1000);

      intervalIds.push(intervalId);
    };

    posts.forEach((post, index) => {
      checkAvailability(post, index);
    });

    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, [posts]);

  const handleMessageButtonClick = (contact) => {
    // Navigate to WhatsAppForm with phone number as a parameter
    navigate(`/whatsapp/${encodeURIComponent(contact)}`);
  };

  return (
    <div className="container-post">
      <nav className="navbar-post">
        <div className="navbar-left-post ">HungerTreat</div>
        <div className="navbar-right-post">
          Want to Donate →
          <button className="go-but" onClick={about}>
            Click here
          </button>
        </div>
      </nav>

      <br />
      <br />
      <h3 className="head mt-3">Donated Food!</h3>

      <div id="postContainer">
        {posts.map((post, index) => (
          <div key={index} className="post-box">
            <div className="post-time">{post.dateTime}</div>
            <br />
            <div className="post-content" id={`postContent${index}`}>
              <h5>Food Items</h5>
              {post.foodItems.map((item, i) => (
                <p key={i}>
                  <strong>{item.foodName}:</strong> {item.quantity}
                </p>
              ))}

              <p>
                <strong>Food Type:</strong> {post.foodType}
              </p>

              <p>
                <strong>Organization Name:</strong> {post.orgName}
              </p>

              <p>
                <strong>Preparation Time:</strong> {post.prepTime}
              </p>
              <p>
                <strong>Location:</strong> {post.location}
              </p>
              <p>
                <strong>Mobile no. :</strong> {post.contact}
              </p>

              {post.notes && (
                <p>
                  <strong>Notes:</strong> {post.notes}
                </p>
              )}

              {unavailablePosts.includes(index) && (
                <p className="unavailable-warning">This post is unavailable</p>
              )}
            </div>
            <br />
            <br />
            <button
              id={`msgButton${index}`}
              className="msg-button"
              style={{
                display: unavailablePosts.includes(index) ? "none" : "block",
              }}
              onClick={() => handleMessageButtonClick(post.contact)}
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
