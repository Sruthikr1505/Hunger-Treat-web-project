require("dotenv").config(); // Load environment variables from .env
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Use from env
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Environment variables
const port = process.env.PORT || 5000; // Fallback to 5000 if PORT is not set
const uri = process.env.MONGO_URI; // Use from env

// MongoDB connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Google OAuth2 client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Use from env

// Schemas and Models
const userpassSchema = new mongoose.Schema({ email: String, password: String });
const usermailSchema = new mongoose.Schema({ email: String });
const UserPass = mongoose.model("UserPass", userpassSchema);
const UserMail = mongoose.model("UserMail", usermailSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // Hashed password
  googleAccount: Boolean,
});
const User = mongoose.model("User", userSchema);

// Post Schema
const postSchema = new mongoose.Schema({
  foodItems: [
    {
      foodName: String,
      quantity: Number,
    },
  ],
  foodType: String,
  orgName: String,
  prepTime: String,
  location: String,
  dateTime: String,
  contact: String,
  notes: String,
});
const Post = mongoose.model("Post", postSchema);

// Donor Schema
const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  orgName: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});
const Donor = mongoose.model("Donor", donorSchema);

// Receiver Schema
const receiverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  orgName: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});
const Receiver = mongoose.model("Receiver", receiverSchema);

app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body; // Google ID token from the frontend

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Match your client ID
    });

    const payload = ticket.getPayload(); // Extract user info
    console.log("User Info:", payload);

    const { email, name } = payload;

    // Find or create the user in your database
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, googleAccount: true });
    }

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      user,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});


// Routes
app.post("/api/saveUserData", async (req, res) => {
  console.log("hi shobi");
  const { password, email, googleToken } = req.body;
  try {
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Use from env
      });
      const payload = ticket.getPayload();
      const emailFromGoogle = payload.email;

      if (emailFromGoogle !== email) {
        return res
          .status(400)
          .json({ message: "Invalid email associated with Google account" });
      }
    }

    const emailExistsInUserPass = await UserPass.findOne({ email });
    const emailExistsInUserMail = await UserMail.findOne({ email });

    if (emailExistsInUserPass || emailExistsInUserMail) {
      res.status(400).json({ message: "Email already exists in the database" });
    } else {
      if (email && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserPass.create({ email, password: hashedPassword });
        res
          .status(200)
          .json({ message: "Email and password successfully saved" });
      } else if (email) {
        await UserMail.create({ email });
        res.status(200).json({ message: "Email successfully saved" });
      } else {
        res.status(400).json({ message: "Missing required fields" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

app.post("/api/checkUserPassword", async (req, res) => {
  const { email, password, googleToken } = req.body;
  try {
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Use from env
      });
      const payload = ticket.getPayload();
      const emailFromGoogle = payload.email;

      const userMail = await UserMail.findOne({ email: emailFromGoogle });
      if (userMail) {
        return res
          .status(200)
          .json({ success: true, message: "Login successful with Google" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "No account found for this email" });
      }
    } else {
      const user = await UserPass.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return res
            .status(200)
            .json({ success: true, message: "Login successful" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Incorrect password" });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Email not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking credentials", error });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ dateTime: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.post("/api/donors", async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.status(200).json({ message: "New donor created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/donors/:orgName", async (req, res) => {
  try {
    const donor = await Donor.findOne({ orgName: req.params.orgName.trim() });
    if (donor) {
      res.status(200).json(donor);
    } else {
      res.status(404).json({ message: "OrgName not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/api/receivers", async (req, res) => {
  try {
    const newReceiver = new Receiver(req.body);
    await newReceiver.save();
    res.status(200).json({ message: "New receiver created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
