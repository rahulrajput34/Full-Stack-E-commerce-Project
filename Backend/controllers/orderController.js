// Place order by three methods(COD, Stripe, Razorpay)
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Globle varibaless for currency and delivery chagres
const currency = 'cad'
const deliveryCharges = 2.99
// Initialize gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order using COD method
const placeOrder = async (req, res) => {
    try {
        // Whenever the order is placed by user, we gonna get all four info from the user
        const {userId, items, amount, address} = req.body;
        // Store all the information of the order
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date: Date.now(),
        }
        // Create the basic stucture of an order
        const newOrder = new orderModel(orderData);
        await newOrder.save();  // Then we need to save the order in the database, The logic of where to save this data, its will on the router

        // After placing the order, we need to clear the cart data of the user
        await userModel.findByIdAndUpdate(userId, {cartData: {}});
        res.json({success: true, message: "Order placed successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})   
    }
} // after doing this COD controller function, we need to intergrates the API with the frontend

// Placing order using Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        // get the data from req.body
        const {userId, items, amount, address} = req.body;
        // Whenever we creates any request, in the header this origin property will be created which includes the frontend URL
        const { origin } = req.headers;
        // orderData to store all the information of the order
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment:false,
            date: Date.now(),
        }
        // Create the basic stucture of an order and save to the database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Now we create the line_items, using that we can execute the stripe method
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));   

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,
        });
        // Create the stripe session
        // Whenever the session will be created there will be one URL
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        });

        // Using this URL we send the user to the payment gateway
        res.json({success: true, session_url: session.url})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Verify Stripe
const verifyStripe = async (req, res) => {
    const {orderId, success, userId} = req.body;
    try {
        // if the above success is true we will change the payment status to the true and make the shoping cart empty
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true});
        } else{
            // if the succces is not true (means payment is false)
            // then we will delete that order
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})  
    }
}

// Display all the orders on the Admin panel
const allOrders = async (req, res) => {
    try {
        // All orders from all users
        // This data will be stored inside the array
        const orders = await orderModel.find({});
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "allOrders is not working in Controller"})
    }
}

// When user place an order its  going to store inside the database 
// Now to display that oder he or she placed on frontend
// We added to the router where we give endpoint to it
// Logic
const userOrders = async (req, res) => {
    try {
        // id comes as user want to access his order on frontend (comes from frontend)
        const {userId}= req.body;
        // using that useId, we can find the orders of that perticuler user
        // We have passed passed the name userId, we check it if we want from going to database
        const orders = await orderModel.find({userId});
        res.json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message })
    }
}
// Update order status from admin panel
// If admin change the status of the order it should be change inside the database
// Logic of that
const updateStatus = async (req, res) => {
    try {
        // from frontend
        // we want to send this orderId and status when we hit the API
        // That is why we gave the req.body
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Order status updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
export {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
}