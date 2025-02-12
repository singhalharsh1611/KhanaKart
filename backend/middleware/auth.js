import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        // console.log("Received token:", token); // Log the received token

        // Check if the token is in the correct format
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error("Token is not in the correct format");
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        // console.log("JWT verification error:", error.message); // Log the error message
        res.json({ success: false, message: "Error" });
    }
};

export default authMiddleware;