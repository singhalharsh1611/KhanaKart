import express from "express"
import { loginUser, registerUser, sendMail, updatePassword } from "../controllers/userController.js"
import passport from "passport";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const userRouter = express.Router();

// Auth with Google
userRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

userRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    // console.log(req.user);
    if (req.user) {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`${process.env.FRONTEND_URL}/token-issue?token=${token}`);
    } else {
        res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
});

//token-verifier route
userRouter.get('/token-issue', (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ token });
});

userRouter.get('/logout', (req, res) => {
    req.session = null;
    res.redirect(`${process.env.FRONTEND_URL}`);

});

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/forgetPassword",sendMail);
userRouter.post("/updatePassword",updatePassword);

userRouter.get("/:id", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ name: user.name });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
});

export default userRouter;