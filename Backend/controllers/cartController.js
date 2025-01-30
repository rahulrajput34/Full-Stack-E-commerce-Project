import userModel from "../models/userModel.js";
import Joi from "joi";

/**
 * Adds an item to the user's cart.
 *
 * Validates the request data, checks if the user exists, and either increments the quantity
 * of the existing item in the user's cart or adds the item to the cart. Updates the cart data in the database.
 *
 * @async
 * @function addToCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const addToCart = async (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    itemId: Joi.string().required(),
    size: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { userId, itemId, size } = value;

  try {
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (err) {
    next(err);
  }
};

/**
 * Updates the quantity of a specific item and size in the user's cart.
 *
 * Validates the request data, checks if the user and item exist in the cart,
 * and updates the item's quantity. Saves the changes to the database.
 *
 * @async
 * @function updateCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const updateCart = async (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
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

  const { userId, itemId, size, quantity } = value;

  try {
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res
        .status(404)
        .json({ success: false, message: "Item or size not found in cart" });
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieves the user's cart data.
 *
 * Validates the request data, fetches the user's cart data from the database,
 * and sends it back to the client.
 *
 * @async
 * @function getUserCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const getUserCart = async (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  const { userId } = value;

  try {
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.status(200).json({
      success: true,
      cartData,
      message: "Cart data fetched",
    });
  } catch (err) {
    next(err);
  }
};

export { addToCart, updateCart, getUserCart };
