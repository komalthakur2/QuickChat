import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    console.log("AUTH START");
    console.log("TOKEN:", req.headers.token);
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.error("Token verification failed: User not found");
            return res.json({ success: false, message: "User not found" });
        }
        console.log("AUTH SUCCESS");
        req.user = user;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification failed error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller to check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
};