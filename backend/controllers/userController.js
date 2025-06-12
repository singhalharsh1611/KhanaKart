import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from "nodemailer";

// login user


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        if (email === process.env.ADMIN_EMAIL) {
            if (password === process.env.ADMIN_PASSWORD) {
                const token = createToken("admin-id", "admin");
                return res.json({ success: true, token });
            } else {
                return res.json({ success: false, message: "Incorrect admin credentials" });
            }
        }

        const user = await userModel.findOne({ email });
        // console.log(user);

        if (!user) {
            return res.json({ success: false, message: "Email does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect Credentials" })
        }
        
        const token = createToken(user._id, user);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
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

const otpStore = {};
export const sendMail = async (req, res) => {
    try {
        // Generate 6-digit OTP
        const { email } = req.body;

        // Validate input
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        // User exist or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // generate and store otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

        // Send OTP via nodemailer 
        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: `${process.env.SENDER_GMAIL}`,
                pass: `${process.env.SENDER_PASS}`, // Use App Password, not your Gmail password!
            },
        });

        // Mail options
        const mailOptions = {
            from: `<${process.env.SENDER_GMAIL}>`,
            to: `${email}`,
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}`,
            html: `<h3>ThankYou for Visiting KhanaKart <br> Your OTP is: <strong>${otp}</strong></h3>`,
        };

        // Send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sented:", info.messageId);
        res.json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: "Email failed", error });
    }
}

export const updatePassword = async (req, res) => {
    console.log("updatePassword called");
    try {
        const { email, password, otp } = req.body;
        // Validate input
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Weak password" });
        }

        const stored = otpStore[email];
        // console.log(stored,otp)
        if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
            return res.json({ success: false, message: "Invalid or expired OTP" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        console.log("password update");
        delete otpStore[email]; // clean up used OTP

        const token = createToken(user._id);
        res.json({ success: true, message: "Password updated", token });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: "Email failed", error });
    }
};

