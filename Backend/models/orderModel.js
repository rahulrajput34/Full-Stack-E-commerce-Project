import mongoose from "mongoose";

// Schema for the order history
// In this format it is going to store inside the Database

// userID, status generated as default
// items, amount comes from the usecontext we used inside the PlaceOrder.jsx
// Adrress comes from the input form inside PlaceOrder.jsx
// paymenet and paymentMethod we gonna write the logic on the backend
const orderSchema  = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Order Placed"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true,
    }
});

const orderModel = mongoose.model.order || mongoose.model('order', orderSchema);    
export default orderModel;  