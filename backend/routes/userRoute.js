import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"
import passport from "passport";

const userRouter = express.Router();

// Auth with Google
userRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

userRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    const token = req.user._id;
    res.redirect('http://localhost:5173/token-issue');
});

//token-verifier route
userRouter.get('/token-issue', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = req.user._id;
    res.json({ token });
});

userRouter.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('http://localhost:5173');
});

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;