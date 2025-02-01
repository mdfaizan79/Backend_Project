const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserVerification = require('../models/UserVerification');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    let { name, email, password, dateOfBirth } = req.body;

    if (!name || !email || !password || !dateOfBirth) {
      return res.json({ status: 'FAILED', message: 'Empty input fields!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    const savedUser = await newUser.save();
    res.json({ status: 'SUCCESS', message: 'User registered successfully', data: savedUser });

    sendOTPVerificationEmail(savedUser, res);
  } catch (error) {
    res.json({ status: 'FAILED', message: error.message });
  }
});

// Send OTP Email
const sendOTPVerificationEmail = async (user, res) => {
  try {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const hashedOTP = await bcrypt.hash(otp, 10);

    const newVerification = new UserVerification({
      userId: user._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    await newVerification.save();

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: 'Verify Your Email',
      html: `<p>Your OTP is <b>${otp}</b></p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ status: 'PENDING', message: 'OTP email sent', data: { userId: user._id } });
  } catch (error) {
    res.json({ status: 'FAILED', message: 'Failed to send OTP' });
  }
};

// Verify OTP Route
router.post('/verifyOTP', async (req, res) => {
  try {
    let { userId, otp } = req.body;

    const records = await UserVerification.find({ userId });

    if (!records.length) {
      throw new Error('User not found or already verified.');
    }

    const { expiresAt, otp: hashedOTP } = records[0];

    if (expiresAt < Date.now()) {
      await UserVerification.deleteMany({ userId });
      throw new Error('OTP expired. Request a new one.');
    }

    const isValid = await bcrypt.compare(otp, hashedOTP);
    if (!isValid) {
      throw new Error('Invalid OTP.');
    }

    await User.updateOne({ _id: userId }, { verified: true });
    await UserVerification.deleteMany({ userId });

    res.json({ status: 'SUCCESS', message: 'Email verified successfully' });
  } catch (error) {
    res.json({ status: 'FAILED', message: error.message });
  }
});

// Resend OTP
router.post('/resendOTP', async (req, res) => {
  try {
    let { userId, email } = req.body;

    if (!userId || !email) throw new Error('Missing user details');

    await UserVerification.deleteMany({ userId });
    sendOTPVerificationEmail({ _id: userId, email }, res);
  } catch (error) {
    res.json({ status: 'FAILED', message: error.message });
  }
});

module.exports = router;
