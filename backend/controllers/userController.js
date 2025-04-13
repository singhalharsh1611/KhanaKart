import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        const user = await userModel.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.json({ success: false, message: "Email does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect Credentials" })
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user

export const registerUser = async (req, res) => {
    // console.log(req.body);
    try {
        const { name, email, password } = req.body;

        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User Already Exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }

}


export const updatePassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate inputs
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
      if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" });
      }
  
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User does not exist" });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update user's password
      user.password = hashedPassword;
      await user.save();
  
      // Optionally, create new token (if needed)
      const token = createToken(user._id);
  
      res.json({ success: true, message: "Password updated successfully", token });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Server Error" });
    }
  };
  