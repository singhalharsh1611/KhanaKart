// config/passport.js
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userModel from '../models/userModel.js';

const passportSetup = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in db
            const existingUser = await userModel.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            // else create a new user in db
            const newUser = await new userModel({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            }).save();
            done(null, newUser);
        } catch (error) {
            console.error(error);
            done(error, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userModel.findById(id).then((user) => {
            done(null, user);
        });
    });
};

export default passportSetup;