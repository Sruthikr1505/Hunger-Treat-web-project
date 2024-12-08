// GoogleSignIn.js
import { jwtDecode } from 'jwt-decode';

export function initializeGoogleSignIn(callback) {
  /* global google */
  console.log("Initializing Google Sign-In");
  google.accounts.id.initialize({
    client_id: "365837606651-n71uhar13mveorg8h57h4krd6p8pp3s6.apps.googleusercontent.com",
    callback: callback,
  });
}

export function renderGoogleButton() {
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    { theme: "inline", size: "small" }
  );
}

// export function handleGoogleSignInResponse(response) {
//   console.log("Encoded JWT ID token: " + response + response.credential);
//   var userObject = jwtDecode(response.credential);
//   console.log(userObject);

//   if (!response || !response.credential) {
//     console.error("No Google credentials received");
//     return;
//   }

//   const googleToken = response.credential; // Ensure we get the token string
//   console.log("Google Token received:", googleToken);

//   try {
//     // Optionally decode the token to check contents
//     const decodedToken = jwtDecode(googleToken);
//     console.log("Decoded Google Token:", decodedToken);
//   } catch (error) {
//     console.error("Error decoding token:", error);
//   }
// }

export function handleGoogleSignInResponse(response) {
  if (!response || !response.credential) {
    console.error("No Google credentials received");
    return;
  }

  const googleToken = response.credential; // Token from Google
  console.log("Google Token received:", googleToken);

  // Send the token to the backend for further validation
  fetch("https://hungertreat.onrender.com/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: googleToken }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("Login successful:", data.user);
      } else {
        console.error("Login failed:", data.error);
      }
    })
    .catch((err) => console.error("Error sending token to backend:", err));
}
