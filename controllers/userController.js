const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  console.log("Inside register user");
  const { username, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User already exists with this email" });
    }

    const newUser = new Users({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  console.log("Inside login user");
  const { email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    console.log("Found user:", existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { userMail: existingUser.email, role: existingUser.role },
      process.env.jwtKey,             // must match .env
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.googleAuth=async(req,res)=>{
    const {email,password,username,profile}=req.body;
    try{
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
          // User exists, proceed to login
          const token = jwt.sign(
            { userMail: existingUser.email, role: existingUser.role },
            process.env.jwtKey)
          console.log(token);
          res.status(200).json({ message: "Login successful", user: existingUser, token });
        }
        else {
          // User does not exist, create a new user
          const newUser = new Users({ username, email, password, profile });
          await newUser.save(); //save to database
          const token = jwt.sign(
            { userMail: newUser.email, role: newUser.role },
            process.env.jwtKey
          );
          console.log(token);
          res.status(201).json({ message: "User registered successfully", user: newUser, token });
        }
    }
    catch(error){
        console.error("Error during Google authentication:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//get all users - admin

exports.getAllUsersAdmin = async (req,res)=>{
    console.log("Inside Get All Users for Admin");
    try{
        const users = await Users.find() 
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}