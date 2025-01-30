import userModel from "../models/userModel.js";
import Joi from 'joi';

/**
 * Adds an item to the user's cart.
 *
 * @async
 * @function addToCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */
const addToCart = async (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        itemId: Joi.string().required(),
        size: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
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
 * @async
 * @function updateCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */
const updateCart = async (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        itemId: Joi.string().required(),
        size: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { userId, itemId, size, quantity } = value;

    try {
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        if (!cartData[itemId] || !cartData[itemId][size]) {
            return res.status(404).json({ success: false, message: "Item or size not found in cart" });
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
 * @async
 * @function getUserCart
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing cart data or an error message.
 */
const getUserCart = async (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { userId } = value;

    try {
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        res.status(200).json({ success: true, cartData, message: "Cart data fetched" });
    } catch (err) {
        next(err);
    }
};

export {
    addToCart,
    updateCart,
    getUserCart
};
