// Server Setup
import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

/**
 * Initialize the Express application and configure middlewares, database connections,
 * and API routes. The application serves as the backend for handling requests from
 * the frontend and connecting to external services such as MongoDB and Cloudinary.
 */



// App Configuration
const app = express();
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000


// Database Connection
if (!connectDB()) {
    console.error('Error: Failed to connect to MongoDB');
}



// Cloudinary Connection
if (!connectCloudinary()) {
    console.error('Error: Failed to connect to Cloudinary');
}



// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for handling cross-origin requests



// Routes
app.use('/api/user', userRouter); // User-related operations
app.use('/api/product', productRouter); // Product-related operations
app.use('/api/cart', cartRouter); // Cart-related operations
app.use('/api/order', orderRouter); // Order-related operations



// Root Endpoint
app.get('/', (req, res) => {
    res.send('API is working!');
});



// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
