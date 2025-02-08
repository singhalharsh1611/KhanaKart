import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false //not required because user can login with google

    },
    googleId: {
        type: String,
        required: false
    },
    cartData: {
        type: Object,
        default: {}
    }
}, { minimize: false })

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel;