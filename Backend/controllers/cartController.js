import userModel from "../models/userModel.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

/**
 * Adds an item to the user's cart.
 * Requires a valid JWT token in the request headers.
 *
 * @async
 * @function addToCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
export const addToCart = async (req, res, next) => {
  // Validate only itemId and size from the body; no userId required
  const schema = Joi.object({
    itemId: Joi.string().required(),
    size: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { itemId, size } = value;

  // Check for the token in the headers
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // The user’s _id should be inside the token’s payload; adapt as needed
    const userId = decoded._id;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "Product added to cart" });
  } catch (err) {
    // If the JWT is invalid or expired, return an Unauthorized response
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
    next(err);
  }
};

/**
 * Updates the quantity of a specific item and size in the user's cart.
 * Requires a valid JWT token in the request headers.
 *
 * @async
 * @function updateCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
export const updateCart = async (req, res, next) => {
  // Validate only itemId, size, and quantity
  const schema = Joi.object({
    itemId: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { itemId, size, quantity } = value;

  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res
        .status(404)
        .json({ success: false, message: "Item or size not found in cart" });
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "Cart updated" });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
    next(err);
  }
};

/**
 * Retrieves the user's cart data.
 * Requires a valid JWT token in the request headers.
 *
 * @async
 * @function getUserCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
export const getUserCart = async (req, res, next) => {
  // No need to validate userId in body, the token will drive everything
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    return res
      .status(200)
      .json({
        success: true,
        cartData,
        message: "Cart data fetched",
      });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }
    next(err);
  }
};
