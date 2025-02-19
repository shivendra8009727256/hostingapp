// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
require("dotenv").config()

const registerUser = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);

    const { fullName, email, phoneNumber, password, businessType, companyName, address } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password correctly
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Hashed Password Before Saving:", hashedPassword);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password:await hashedPassword,  // Store hashed password
      businessType,
      companyName,
      address
    });

    await newUser.save();
console.log("USER DATA>>>",newUser)
const token = jwt.sign({ userId: newUser._id,userEmail:newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("🔍 Stored Hashed Password:", user.password);
    console.log("🔑 Entered Password:", password);

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token ,user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





// Register a new user
// const registerUser = async (req, res) => {
//   const { fullName,
//     email,
//     phoneNumber,
//     password,
//     businessType,
//     companyName,
//     address,
//     registrationDate,
//     isActive } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create a new user
//     const user = new User({ fullName,
//       email,
//       phoneNumber,
//       password,
//       businessType,
//       companyName,
//       address,
//       registrationDate,
//       isActive });
//     await user.save();

//     // Generate a JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );

//     res.status(201).json({ message: 'User registered successfully', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// Login an existing user
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       console.log("❌ Password mismatch!");
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     console.log("🔑 Password Match: true");

//     // Generate JWT Token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     console.log("REQ>BODY>>>>>>",user)
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare the entered password with the stored password
//     console.log("KKKKKKKKKKKKKKKKKKKK",password,"MMMMMMMMMMMM>>>>>>>>>>>>>",user.password)
//     const isMatch = await bcrypt.compare("Admin@321", user.password);
//     console.log("MATCHING PASSWORD >>>>>>>>", isMatch)
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );
//     console.log(token,"REQ>BODY>>>>>>",user)
//     // res.send("POST API IS WORKING")
//     res.send({ message: 'Login successful',data:user, token:token })
//     // res.status(200).json({ message: 'Login successful',user, token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

module.exports = { registerUser, loginUser };
