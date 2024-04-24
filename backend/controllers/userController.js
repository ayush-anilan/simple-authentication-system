const User = require("../models/User");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv").config();

// Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

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

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
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
