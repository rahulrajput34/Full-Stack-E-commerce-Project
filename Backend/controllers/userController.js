import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Helper function to create a JWT token.
 *
 * @param {string} id - User ID.
 * @returns {string} - JWT token.
 */
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

/**
 * Login a user.
 *
 * This function validates the user's email and password, checks for a matching user
 * in the database, and verifies the password. If successful, it returns a JWT token.
 *
 * @async
 * @function loginUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success or failure message.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Register a new user.
 *
 * This function checks if the email is already in use, validates the email and password,
 * hashes the password, and stores the user in the database. Returns a JWT token on success.
 *
 * @async
 * @function registerUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success or failure message.
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Admin login.
 *
 * Authenticates an admin user using environment variables for email and password.
 * Returns a JWT token if successful.
 *
 * @async
 * @function adminLogin
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success or failure message.
 */
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
            return res.json({ success: true, token });
        }

        res.status(401).json({ success: false, message: "Invalid admin credentials" });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export {
    loginUser,
    registerUser,
    adminLogin
};
