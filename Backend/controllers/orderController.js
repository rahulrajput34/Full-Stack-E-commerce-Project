import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "cad";
const deliveryCharges = 2.99;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Places an order using the Cash-on-Delivery (COD) method.
 *
 * @async
 * @function placeOrder
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order (COD):", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * Places an order and processes payment through Stripe.
 *
 * @async
 * @function placeOrderStripe
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order (Stripe):", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * Verifies the status of a Stripe order.
 *
 * @async
 * @function verifyStripe
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error verifying Stripe payment:", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * Retrieves all orders for display in the admin panel.
 *
 * @async
 * @function allOrders
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.json({ success: false, message: "Failed to fetch all orders" });
  }
};

/**
 * Retrieves all orders for a specific user.
 *
 * @async
 * @function userOrders
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * Updates the status of an order from the admin panel.
 *
 * @async
 * @function updateStatus
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
};
