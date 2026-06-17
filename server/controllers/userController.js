import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// Signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "Account already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });
        const token = generateToken(newUser._id);
        res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller to login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = generateToken(userData._id);
        res.json({ success: true, userData, token, message: "Login successful" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Controller to check if a user is authenticated
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
};

// Controller to update profile
export const updateProfile = async (req, res) => {
    console.log("Profile update controller reached");
    console.log("UPDATE PROFILE START");
    console.log("User ID:", req.userId);
    console.log("req.user:", req.user);
    console.log("req.body:", req.body ? { ...req.body, profilePic: req.body.profilePic ? "base64..." : undefined } : null);

    console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API KEY EXISTS:", !!process.env.CLOUDINARY_API_KEY);
    console.log("API SECRET EXISTS:", !!process.env.CLOUDINARY_API_SECRET);

    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        // Check whether user document is found before updating
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            console.error("User document not found before updating");
            res.json({ success: false, message: "User not found" });
            console.log("Response sent");
            return;
        }

        let updatedUser;
        if (!profilePic) {
            console.log("No profilePic, updating bio and fullName for userId:", userId);
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
            console.log("updatedUser (no image) id:", updatedUser?._id);
        } else {
            console.log("Uploading image to Cloudinary...");
            try {
               const upload = await cloudinary.uploader.upload(profilePic);
               console.log("UPLOAD SUCCESS", upload.secure_url);
               updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true });
               console.log("updatedUser (with image) id:", updatedUser?._id);
            } catch(error){
               console.error("CLOUDINARY ERROR:", error);
               console.error("STATUS:", error.http_code);
               console.error("MESSAGE:", error.message);
               throw error;
            }
        }
        console.log("Profile updated");
        res.json({ success: true, user: updatedUser });
        console.log("Response sent");
    } catch (error) {
        console.log("updateProfile controller caught error!");
        console.error(error);
        res.json({ success: false, message: error.message });
        console.log("Response sent");
    }
};