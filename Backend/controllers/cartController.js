import userModel from "../models/userModel.js";

// All operation gonna be on the backend
// Function is for when person do request to add then this function will below opartion and interact with databce
const addToCart = async (req, res) => {
    try {
        // That is what we got from the user
        // Which is the product user want, the size user want 
        // The id is authomatically generated from Database
        const { userId, itemId, size } = req.body

        // We are getting the user data from the model
        const userData = await userModel.findById(userId)
        // console.log(userData);
        
        // from the user data we gonna get the cardData from there
        let cartData = (await userData.cartData) || {};

        // The item already exists in the user's cart, it goes to check if the specific size of the item exists.
        if (cartData[itemId]) {
            // The specific size of the item already exists in the cart. If yes, it increases the quantity of that size by 1.
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            // If the item exists but the size does not, it adds this size to the item with a quantity of 1.
            else {
                cartData[itemId][size] = 1
            }
        } else {  
            // If the item does not exist in the cart, it creates a new entry for this item in the cart, and then sets the quantity for the selected size to 1.
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        // Updates the user's cart in the database with the new cartData in the given userID 
        await userModel.findByIdAndUpdate(userId, { cartData })
        // If all good then we generate the response
        res.json({ success: true, message: "Product added to cart" })
    } catch (error) {
        // For erorr
        console.log(error)
        res.json({ success: false, message: "Error adding to cart" })
    }
};

// updateCart function is used to update the quantity of a specific item and size in a user's shopping cart.
const updateCart = async (req, res) => {
    try {
        // This is what we got from the user
        const { userId, itemId, size, quantity } = req.body;
        // The backend fetches the user’s data from the database using their userId. This data includes their current cart data.
        const userData = await userModel.findById(userId);
        // This is how we get the data of the cart from userData
        let cartData = await userData.cartData;
        // change the quantity
        cartData[itemId][size] = quantity;
        //Now it's update into the databace
        await userModel.findByIdAndUpdate(userId, { cartData })
        // If response is positive
        res.json({ success: true, message: "Cart updated" })
    } catch (error) {
        // For error
        console.log(error)
        res.json({ success: false, message: "Error updating cart" })
    }
};

// fetching the user's cart data from the database and sending that data to the frontend as per user request
const getUserCart = async (req, res) => {
    try {
        // Id from user
        const { userId } = req.body;
        // Get the data from the backend
        const userData = await userModel.findById(userId);

        // Now get the value of cartData
        let cartData = await userData.cartData;
        // if true 
        res.json({ success: true, cartData: cartData, message: "Cart data fetched" })
    } catch (error) {
        // If error
        console.log(error)
        res.json({ success: false, message: "Error getting cart" })
    }
};

export {
    addToCart,
    updateCart,
    getUserCart
}