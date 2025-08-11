import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size } = req.body;
    if (!itemId || !size) {
      return res
        .status(400)
        .json({ success: false, message: "itemId and size are required" });
    }

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData }); // <-- fixed
    res
      .status(200)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size, quantity } = req.body;
    if (!itemId || !size || typeof quantity !== "number") {
      return res.status(400).json({
        success: false,
        message: "itemId, size, quantity are required",
      });
    }

    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    cartData[itemId] = cartData[itemId] || {};
    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (!Object.keys(cartData[itemId]).length) delete cartData[itemId];
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }); // <-- fixed
    res
      .status(200)
      .json({ success: true, message: "Item quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).lean();
    res.status(200).json({ success: true, cartData: user?.cartData || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
