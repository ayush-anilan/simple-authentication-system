const User = require("../models/User");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
};

// SignIn
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// SignUp
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Generate OTP
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    // Save OTP and its expiration time
    const otpExpire = new Date();
    otpExpire.setMinutes(otpExpire.getMinutes() + 5); // OTP will expire after 5 minutes

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpire,
    });

    await newUser.save();

    // Send OTP to the users email
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending OTP" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "OTP sent to your email" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const now = new Date();
    if (now > user.otpExpire) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Clear OTP and its expiration time
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user information
exports.getUser = async (req, res) => {
  try {
    const token = req.token;
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      const userId = decoded.userId;

      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const token = req.token;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userId = decoded.userId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isCurrentPasswordValid) {
        return res.status(400).json({ message: "Invalid current password" });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    });
  } catch (error) {}
};
