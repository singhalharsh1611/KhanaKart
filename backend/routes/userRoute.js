import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"
import passport from "passport";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// Auth with Google
userRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

userRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    if (req.user) {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`http://localhost:5173/token-issue?token=${token}`);
    } else {
        res.redirect('http://localhost:5173/login');
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
    res.redirect('http://localhost:5173');
});

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

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