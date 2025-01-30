import jwt from "jsonwebtoken";

/**
 * Middleware for admin authentication.
 * 
 * This middleware ensures that the incoming request carries a valid JWT token.
 * The token is verified against a secret key and checked for a specific admin credential.
 * If validation passes, the request proceeds; otherwise, an unauthorized response is sent.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware or route handler.
 */
const adminAuth = async (req, res, next) => {
    try {
        // Extract token from request headers
        const { token } = req.headers;

        // If no token is provided, respond with unauthorized access
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        // Verify token using secret key
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Check if the decoded token matches admin credentials
        const isAdmin = tokenDecode === `${process.env.ADMIN_EMAIL}${process.env.ADMIN_PASSWORD}`;
        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        // If valid, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors during token verification
        console.error("Admin Auth Error:", error);
        res.status(401).json({
            success: false,
            message: `Authentication failed: ${error.message}`
        });
    }
};

export default adminAuth;
