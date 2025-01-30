import jwt from "jsonwebtoken";

/**
 * Middleware for user authentication.
 * 
 * This middleware checks for a valid JWT in the `Authorization` header.
 * If the token is valid, it decodes the token and attaches the user ID to the request object,
 * allowing subsequent routes to access it. If the token is invalid or missing, it sends
 * an appropriate error response.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware or route handler.
 */
const authUser = async (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is provided, return an unauthorized response
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Please log in again."
        });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach user ID from the decoded token to the request object
        req.body.userId = decoded.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        console.error("JWT Verification Error:", error);
        res.status(401).json({
            success: false,
            message: `Token verification failed: ${error.message}`
        });
    }
};

export default authUser;
