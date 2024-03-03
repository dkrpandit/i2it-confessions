const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connection is successful");
})
    .catch((err) => {
        console.log(`We got an error: ${err}`);
    });

// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// User model
const User = mongoose.model("User", userSchema);

// Signup route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Optionally, generate a JWT token
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);

        // Respond with a success message or token
        res.status(201).json({ message: "Registration successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        // Check if the password is valid
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Optionally, generate a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // Respond with a success message or token
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});
