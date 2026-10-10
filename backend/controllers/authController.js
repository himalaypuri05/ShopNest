const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail"); // adjust path if needed

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET || process.env.JWt_SECRET, { expiresIn: "7d" });
};

//  Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // TODO : Hash the password before saving to the database
    // TODO : Implement JWT token generation for authentication
    // TODO : OTP sending and verification for email confirmation

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const message = `
        Welcome to ShopNest, ${name}! Thank you for registering with us. We are excited to have you as part of community. TO complete your registration, Please use the following One-Time Password (OTP) : 
        Your otp for ShopNest registration is : ${otp}`;

      await sendEmail(email, "Welcome to ShopNest - Your OTP for Registraion", message);
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(500).json({ message: "invaid User Data" });
    }
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers
};
